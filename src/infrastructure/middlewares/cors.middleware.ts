import http from 'node:http';
import { HttpResponse } from '../../domain/types/route';
import { HTTP_STATUS } from '../../domain/constants';

export const corsMiddleware = (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & {
        req: http.IncomingMessage;
    },
): HttpResponse | void => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Manejar solicitudes OPTIONS (pre-flight)
    if (req.method === 'OPTIONS') {
        return {
            statusCode: HTTP_STATUS.NO_CONTENT,
            headers: res.getHeaders(),
        } as unknown as HttpResponse;
    }
};
