import { inject, singleton } from 'tsyringe';
import {
    TransversalApproachEntity,
    TransversalApproachEntityPacket,
} from '../../domain/entity/transversal-approach.entity';
import TransversalApproachRepository from '../../domain/repository/transversal-approach.repository';
import MysqlCrudOperations from '../db/mysql/mysql-crud-operations';
import MysqlExecutor from '../db/mysql/mysql-executor';
import ConsoleLogger from '../logger/console/console.logger';
import Logger from '../logger/logger';

const className = 'MysqlTransversalApproachRepository';

@singleton()
export default class MysqlTransversalApproachRepository
    extends MysqlCrudOperations<TransversalApproachEntity, TransversalApproachEntityPacket>
    implements TransversalApproachRepository
{
    constructor(@inject(ConsoleLogger) logger: Logger, @inject(MysqlExecutor) executor: MysqlExecutor) {
        super(className, logger, executor, 'transversal_approach');
        logger.info({ className, message: `${className} created successfully` });
    }
}
