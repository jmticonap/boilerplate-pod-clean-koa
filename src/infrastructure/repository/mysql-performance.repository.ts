import { inject, singleton } from 'tsyringe';
import { PerformanceEntity, PerformanceEntityPacket } from '../../domain/entity/performance.entity';
import PerformanceRepository from '../../domain/repository/performance.repository';
import MysqlCrudOperations from '../db/mysql/mysql-crud-operations';
import MysqlExecutor from '../db/mysql/mysql-executor';
import ConsoleLogger from '../logger/console/console.logger';
import Logger from '../logger/logger';

const className = 'MysqlPerformanceRepository';

@singleton()
export default class MysqlPerformanceRepository
    extends MysqlCrudOperations<PerformanceEntity, PerformanceEntityPacket>
    implements PerformanceRepository
{
    constructor(@inject(ConsoleLogger) logger: Logger, @inject(MysqlExecutor) executor: MysqlExecutor) {
        super(className, logger, executor, 'performance');
        logger.info({ className, message: `${className} created successfully` });
    }
}
