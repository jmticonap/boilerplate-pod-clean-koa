import { isAsyncFunction } from 'util/types';
import { HttpResponse } from '../../domain/types/route';

export class MiddlewareManager {
    private _beforeMiddlewares: Array<(...args: any[]) => any> = [];

    handler<R = HttpResponse>(fnt: (...args: any[]) => any) {
        return async (...argsHandler: any[]): Promise<R> => {
            for (const mdw of this._beforeMiddlewares) {
                let mdwResult: any;
                if (isAsyncFunction(mdw)) {
                    mdwResult = await mdw(...argsHandler);
                } else {
                    mdwResult = mdw(...argsHandler);
                }

                if (mdwResult) return mdwResult;
            }

            if (isAsyncFunction(fnt)) {
                return await fnt(...argsHandler);
            } else {
                return fnt(...argsHandler);
            }
        };
    }

    use<R = any>(fnt: (...args: any[]) => Promise<R> | R): this {
        this._beforeMiddlewares.push(fnt);

        return this;
    }
}

export const middleware = () => new MiddlewareManager();
