import { inject, singleton } from 'tsyringe';
import { SubjectEntity, SubjectEntityPacket } from '../../domain/entity/subject.entity';
import SubjectRepository from '../../domain/repository/subject.repository';
import MysqlCrudOperations from '../db/mysql/mysql-crud-operations';
import MysqlExecutor from '../db/mysql/mysql-executor';
import ConsoleLogger from '../logger/console/console.logger';
import Logger from '../logger/logger';

const className = 'MysqlSubjectRepository';

@singleton()
export default class MysqlSubjectRepository
    extends MysqlCrudOperations<SubjectEntity, SubjectEntityPacket>
    implements SubjectRepository
{
    constructor(@inject(ConsoleLogger) logger: Logger, @inject(MysqlExecutor) executor: MysqlExecutor) {
        super(className, logger, executor, 'subject');
        logger.info({ className, message: `${className} created successfully` });
    }
}
