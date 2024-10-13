import { isAsyncFunction } from 'node:util/types';
import koa from 'koa';
import { HttpMethod } from '../../domain/types/route';
import { HTTP_STATUS } from '../../domain/constants';

type RouteType = {
    method: HttpMethod;
    path: string;
    handler: (ctx: koa.ParameterizedContext<koa.DefaultState, koa.DefaultContext, any>) => Promise<any> | any;
};

type MatchType = {
    match: boolean;
    [key: string]: string | boolean;
};

const match = (routePath: string, incomingPath: string): MatchType | null => {
    const regexPattern = routePath.replace(/{([^}]+)}/g, '([^/]+)');
    const regex = new RegExp(`^${regexPattern}$`);

    const match = incomingPath.match(regex);
    const params: MatchType = { match: false };

    if (match) {
        const paramNames = [...routePath.matchAll(/{([^}]+)}/g)].map((match) => match[1]);

        paramNames.forEach((name, index) => {
            params[name] = match[index + 1];
        });
        params['match'] = true;
    }

    return params;
};

export const httpRouterMiddleware = (routes: Array<RouteType>) => {
    return async (ctx: koa.ParameterizedContext<koa.DefaultState, koa.DefaultContext, any>) => {
        const { method } = ctx;

        for (const route of routes) {
            const url = new URL(ctx.request.href);
            if (method !== route.method) continue;

            const isMatch = match(route.path, url.pathname);

            if (!isMatch?.match) continue;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { match: mtc, ...params } = isMatch;
            const pathParameters: Record<string, string> = {};
            for (const [key, value] of Object.entries(params)) {
                if (typeof value === 'string') pathParameters[key] = value;
            }
            ctx.pathParameter = pathParameters;

            if (isAsyncFunction(route.handler)) {
                await route.handler(ctx);
                return;
            } else {
                route.handler(ctx);
                return;
            }
        }

        ctx.status = HTTP_STATUS.NOT_FOUND;
        ctx.body = { error: 'Path not found' };
        return;
    };
};
