import { inject, singleton } from 'tsyringe';
import { StandardEntity, StandardEntityPacket } from '../../domain/entity/standard.entity';
import StandardRepository from '../../domain/repository/standard.repository';
import MysqlCrudOperations from '../db/mysql/mysql-crud-operations';
import MysqlExecutor from '../db/mysql/mysql-executor';
import ConsoleLogger from '../logger/console/console.logger';
import Logger from '../logger/logger';

const className = 'MysqlStandardRepository';

@singleton()
export default class MysqlStandardRepository
    extends MysqlCrudOperations<StandardEntity, StandardEntityPacket>
    implements StandardRepository
{
    constructor(@inject(ConsoleLogger) logger: Logger, @inject(MysqlExecutor) executor: MysqlExecutor) {
        super(className, logger, executor, 'standard');
        logger.info({ className, message: `${className} created successfully` });
    }
}
