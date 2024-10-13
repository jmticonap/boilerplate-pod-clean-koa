import { inject, singleton } from 'tsyringe';
import { CapabilityEntity, CapabilityEntityPacket } from '../../domain/entity/capability.entity';
import CapabilityRepository from '../../domain/repository/capability.repository';
import MysqlCrudOperations from '../db/mysql/mysql-crud-operations';
import MysqlExecutor from '../db/mysql/mysql-executor';
import ConsoleLogger from '../logger/console/console.logger';
import Logger from '../logger/logger';

const className = 'MysqlCapabilityRepository';

@singleton()
export default class MysqlCapabilityRepository
    extends MysqlCrudOperations<CapabilityEntity, CapabilityEntityPacket>
    implements CapabilityRepository
{
    constructor(@inject(ConsoleLogger) logger: Logger, @inject(MysqlExecutor) executor: MysqlExecutor) {
        super(className, logger, executor, 'capability');
        logger.info({ className, message: `${className} created successfully` });
    }
}
