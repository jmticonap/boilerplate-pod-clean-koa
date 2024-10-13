import http from 'node:http';
import { HTTP_STATUS } from '../../domain/constants';
import { HttpMethod, HttpResponse } from '../../domain/types/route';
import EventEmitter from 'node:events';

export type BaseHandler = (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & {
        req: http.IncomingMessage;
    },
    body?: string,
    ...args: any[]
) => any;

class HandlerExecutorManager extends EventEmitter {
    constructor(
        private req: http.IncomingMessage,
        private res: http.ServerResponse<http.IncomingMessage> & {
            req: http.IncomingMessage;
        },
    ) {
        super();
    }

    async execHandler(handler: BaseHandler, body?: string, timeout: number = 10_000) {
        const result = await Promise.race([
            new Promise<HttpResponse>((resolve) => {
                setTimeout(() => {
                    this.emit('timeout');
                    resolve({ statusCode: HTTP_STATUS.REQUEST_TIME_OUT, body: { error: 'TIMEOUT' } });
                }, timeout);
            }),
            new Promise<HttpResponse>((resolve) => {
                setTimeout(async () => {
                    const result = await handler(this.req, this.res, body);
                    this.emit('successful');
                    resolve(result);
                }, 0);
            }),
        ]);

        this.res.writeHead(result.statusCode, { 'Content-Type': 'application/json' });
        this.res.end(result && result.body ? JSON.stringify(result.body) : undefined);
    }
}

export let executorManager: HandlerExecutorManager;

export const server = (
    host: string,
    port: number,
    handler: BaseHandler,
): http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> => {
    return http
        .createServer(
            async (
                req: http.IncomingMessage,
                res: http.ServerResponse<http.IncomingMessage> & {
                    req: http.IncomingMessage;
                },
            ) => {
                const methodWithoutBody: HttpMethod[] = ['GET', 'HEAD'];
                const timeout = +(req.headers['timeout'] || '10000');
                try {
                    let body = '';

                    executorManager = new HandlerExecutorManager(req, res);

                    req.on('error', (err) => {
                        res.end(JSON.stringify(err));
                    });

                    if (req.method && !methodWithoutBody.includes(<HttpMethod>req.method)) {
                        req.on('data', (chunk: string) => (body += chunk));
                        req.on('end', async () => await executorManager.execHandler(handler, body, timeout));
                    } else {
                        await executorManager.execHandler(handler, body, timeout);
                    }
                } catch (error) {
                    res.end(JSON.stringify(error));
                }
            },
        )
        .listen(port, host, () => {
            console.log(`Listening on\n http://127.0.0.1:${port}`);
        });
};
