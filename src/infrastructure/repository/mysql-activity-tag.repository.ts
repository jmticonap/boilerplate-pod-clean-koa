import { inject, singleton } from 'tsyringe';
import { ActivityTagEntity, ActivityTagEntityPacket } from '../../domain/entity/activity-tag.entity';
import ActivityTagRepository from '../../domain/repository/activity-tag.repository';
import MysqlCrudOperations from '../db/mysql/mysql-crud-operations';
import ConsoleLogger from '../logger/console/console.logger';
import Logger from '../logger/logger';
import MysqlExecutor from '../db/mysql/mysql-executor';

const className = 'MysqlActivityTagRepository';

@singleton()
export default class MysqlActivityTagRepository
    extends MysqlCrudOperations<ActivityTagEntity, ActivityTagEntityPacket>
    implements ActivityTagRepository
{
    constructor(@inject(ConsoleLogger) logger: Logger, @inject(MysqlExecutor) executor: MysqlExecutor) {
        super(className, logger, executor, 'activity_tag');
        logger.info({ className, message: `${className} created successfully` });
    }
}
