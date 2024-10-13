import { inject, singleton } from 'tsyringe';
import { CycleEntity, CycleEntityPacket } from '../../domain/entity/cycle.entity';
import CycleRepository from '../../domain/repository/cycle.repository';
import MysqlCrudOperations from '../db/mysql/mysql-crud-operations';
import MysqlExecutor from '../db/mysql/mysql-executor';
import ConsoleLogger from '../logger/console/console.logger';
import Logger from '../logger/logger';

const className = 'MysqlCycleRepository';

@singleton()
export default class MysqlCycleRepository
    extends MysqlCrudOperations<CycleEntity, CycleEntityPacket>
    implements CycleRepository
{
    constructor(@inject(ConsoleLogger) logger: Logger, @inject(MysqlExecutor) executor: MysqlExecutor) {
        super(className, logger, executor, 'cycle');
        logger.info({ className, message: `${className} created successfully` });
    }
}
