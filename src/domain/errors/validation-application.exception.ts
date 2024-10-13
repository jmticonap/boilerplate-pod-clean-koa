import CommonApplicationException, { CommonApplicationExceptionConstructorArgs } from './common-application.exception';

export default class ValidationApplicationException<TAttach> extends CommonApplicationException<TAttach> {
    constructor(args: Omit<CommonApplicationExceptionConstructorArgs<TAttach>, 'status'>) {
        super(args);

        this.status = 'BAD_REQUEST';
    }
}
