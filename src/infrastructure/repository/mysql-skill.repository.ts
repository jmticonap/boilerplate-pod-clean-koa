import { inject, singleton } from 'tsyringe';
import { SkillEntity, SkillEntityPacket } from '../../domain/entity/skill.entity';
import SkillRepository from '../../domain/repository/skill.repository';
import MysqlCrudOperations from '../db/mysql/mysql-crud-operations';
import MysqlExecutor from '../db/mysql/mysql-executor';
import ConsoleLogger from '../logger/console/console.logger';
import Logger from '../logger/logger';

const className = 'MysqlSkillRepository';

@singleton()
export default class MysqlSkillRepository
    extends MysqlCrudOperations<SkillEntity, SkillEntityPacket>
    implements SkillRepository
{
    constructor(@inject(ConsoleLogger) logger: Logger, @inject(MysqlExecutor) executor: MysqlExecutor) {
        super(className, logger, executor, 'skill');
        logger.info({ className, message: `${className} created successfully` });
    }
}
