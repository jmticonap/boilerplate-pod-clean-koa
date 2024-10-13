import CommonApplicationException, { CommonApplicationExceptionConstructorArgs } from './common-application.exception';

export default class UnauthorizedApplicationException<TAttach> extends CommonApplicationException<TAttach> {
    constructor(args: Omit<CommonApplicationExceptionConstructorArgs<TAttach>, 'status'>) {
        super(args);

        this.status = 'UNAUTHORIZED';
    }
}
