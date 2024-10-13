import { HttpMethod } from '../../domain/types/route';

export type HandlerType = (...args: any[]) => Promise<any> | any;

export type RouteType = {
    method: HttpMethod;
    path: string;
    handler: HandlerType;
};
