import 'reflect-metadata';
import { IncomingMessage, Server, ServerResponse } from 'node:http';
import { RouterMiddleware } from '../../../../src/infrastructure/middlewares/router.middleware';
import { RouteType } from '../../../../src/infrastructure/router-manager';
import { middleware } from '../../../../src/infrastructure/middleware-manager';
import HttpClient from '../../../../src/infrastructure/http/http-client';
import { HttpResponse } from '../../../../src/domain/types/route';
import { HTTP_STATUS } from '../../../../src/domain/constants';
import { server } from '../../../../src/infrastructure/server';

describe('RouterMiddleware test suite', () => {
    const sut = RouterMiddleware;

    const routes: Array<RouteType> = [
        {
            method: 'GET',
            path: '/path/user',
            handler: (): Promise<HttpResponse> => {
                const result: HttpResponse = {
                    statusCode: HTTP_STATUS.OK,
                    body: { message: 'user path' },
                };
                return new Promise<HttpResponse>((resolve) => resolve(result));
            },
        },
        {
            method: 'GET',
            path: '/path/archive',
            handler: (): Promise<string> => {
                return new Promise((resolve) => resolve('archive path'));
            },
        },
    ];

    it.only('should execute the handler', async () => {
        const port = 3000;
        const handler = middleware().handler(sut(routes));
        let srv: Server<typeof IncomingMessage, typeof ServerResponse> | undefined = server('127.0.0.1', port, handler);

        process.nextTick(() => {});

        const httpClient = new HttpClient();
        const response = await httpClient.get(`http://127.0.0.1:${port}/path/user`, {
            headers: {},
            timeout: 10_000,
        });

        expect(response.body).toEqual({ message: 'user path' });

        srv.close();
        srv.closeAllConnections();
        srv = undefined;
    }, 10_000);
});
