import { z } from 'zod';
import koa from 'koa';
import { HTTP_STATUS } from '../constants';
import { isAsyncFunction } from 'util/types';
import CommonApplicationException from '../errors/common-application.exception';

export function validationSchemaBody(schema: z.AnyZodObject) {
    const execAnyFn = async (
        fn: (ctx: koa.ParameterizedContext<koa.DefaultState, koa.DefaultContext, any>) => Promise<any> | any,
        ctx: koa.ParameterizedContext<koa.DefaultState, koa.DefaultContext, any>,
        ct: any,
    ) => {
        if (isAsyncFunction(fn)) {
            await fn.apply(ct, [ctx]);
            return;
        } else {
            fn.apply(ct, [ctx]);
            return;
        }
    };

    return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalFn = descriptor.value;
        descriptor.value = async function (ctx: koa.ParameterizedContext<koa.DefaultState, koa.DefaultContext, any>) {
            const body = ctx.request.body;

            if (!body) {
                return await execAnyFn(originalFn, ctx, this);
            }

            const isValid = schema.safeParse(ctx.request.body);
            if (!isValid.success) {
                console.dir(isValid.error, { depth: null, color: true });

                ctx.status = HTTP_STATUS.BAD_REQUEST;
                ctx.body = JSON.parse(isValid.error.message);
                return;
            }
            console.log('Validation successfully');
            return await execAnyFn(originalFn, ctx, this);
        };

        return descriptor;
    };
}

/**
 * This decorator set 'origin' and 'method' in the error object when
 * execution of function fail.
 * @returns
 */
export function controlApplicationException() {
    return function decorator(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalFn = descriptor.value;
        originalFn.bind(target);
        const cpDescriptor = { ...descriptor };

        cpDescriptor.value = async function decoratedFn(
            ctx: koa.ParameterizedContext<koa.DefaultState, koa.DefaultContext, any>,
        ) {
            try {
                /* eslint-disable @typescript-eslint/return-await */
                if (isAsyncFunction(originalFn)) {
                    await originalFn.apply(this, ctx);
                    return;
                }
                /* eslint-enable @typescript-eslint/return-await */

                originalFn.apply(this, ctx);
                return;
            } catch (e) {
                if (e instanceof CommonApplicationException) {
                    if (!e.origin && !e.method) {
                        e.origin = target.constructor.name;
                        e.method = propertyKey;
                    }

                    throw e;
                }

                throw new CommonApplicationException({
                    error: e as Error,
                    origin: target.constructor.name,
                    method: propertyKey,
                });
            }
        };

        return cpDescriptor;
    };
}
