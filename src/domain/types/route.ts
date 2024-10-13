import { IncomingHttpHeaders } from 'node:http';

export type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';

export type HttpBaseMessage<T = any> = {
    body?: T;
};

export type HttpRequest<T = any> = HttpBaseMessage<T> & {
    method: HttpMethod;
    url: string;
    headers?: IncomingHttpHeaders;
    pathParams?: Record<string, string>;
    searchParams?: URLSearchParams;
};
