import { StatusType } from '../types';
import { CommonExceptionListType } from '../types/token.types';

export type CommonApplicationExceptionConstructorArgs<TAttach> = {
    error?: Error;
    origin?: string;
    method?: string;
    message?: string;
    attach?: TAttach;
    status?: StatusType;
    exceptionType?: CommonExceptionListType;
};

/**
 * This exception show error from services and repositories.
 */
export default class CommonApplicationException<TAttach> extends Error {
    public origin?: string;

    public method?: string;

    public attach?: TAttach;

    public status?: StatusType;

    public exceptionType?: CommonExceptionListType;

    constructor(args: CommonApplicationExceptionConstructorArgs<TAttach>) {
        super();

        if (args.error) {
            this.message = args.error.message;
            this.stack = args.error.stack;
            this.name = args.error.name;
        }
        if (args.message) this.message = args.message;
        this.origin = args.origin;
        this.method = args.method;
        this.attach = args.attach;
        this.status = args.status;
        this.exceptionType = args.exceptionType;
    }
}
