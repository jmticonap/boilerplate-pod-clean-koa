import CommonApplicationException, { CommonApplicationExceptionConstructorArgs } from './common-application.exception';

export default class InternalApplicationException<TAttach> extends CommonApplicationException<TAttach> {
    constructor(args: Omit<CommonApplicationExceptionConstructorArgs<TAttach>, 'status'>) {
        super(args);

        this.status = 'INTERNAL_SERVER_ERROR';
    }
}
