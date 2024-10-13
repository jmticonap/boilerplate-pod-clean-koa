import { inject, singleton } from 'tsyringe';
import { GradeEntity, GradeEntityPacket } from '../../domain/entity/grade.entity';
import GradeRepository from '../../domain/repository/grade.repository';
import MysqlCrudOperations from '../db/mysql/mysql-crud-operations';
import MysqlExecutor from '../db/mysql/mysql-executor';
import ConsoleLogger from '../logger/console/console.logger';
import Logger from '../logger/logger';

const className = 'MysqlGradeRepository';

@singleton()
export default class MysqlGradeRepository
    extends MysqlCrudOperations<GradeEntity, GradeEntityPacket>
    implements GradeRepository
{
    constructor(@inject(ConsoleLogger) logger: Logger, @inject(MysqlExecutor) executor: MysqlExecutor) {
        super(className, logger, executor, 'grade');
        logger.info({ className, message: `${className} created successfully` });
    }
}
