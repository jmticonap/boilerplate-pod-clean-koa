import koa from 'koa';
import { HTTP_STATUS } from '../../domain/constants';

export default class GreetingController {
    greeting(ctx: koa.ParameterizedContext<koa.DefaultState, koa.DefaultContext, any>): void {
        ctx.status = HTTP_STATUS.OK;
        ctx.body = { gretting: 'Hola a todos desde el controlador' };

        return;
    }

    query(ctx: koa.ParameterizedContext<koa.DefaultState, koa.DefaultContext, any>): void {
        ctx.status = HTTP_STATUS.OK;
        ctx.body = {
            message: 'Origen: GreetingController',
            query: ctx.pathParameter.id,
        };

        return;
    }
}
