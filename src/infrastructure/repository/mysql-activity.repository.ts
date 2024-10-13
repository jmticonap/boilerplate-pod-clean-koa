import { inject, singleton } from 'tsyringe';
import { ActivityEntity, ActivityEntityPacket } from '../../domain/entity/activity.entity';
import ActivityRepository from '../../domain/repository/activity.repository';
import MysqlCrudOperations from '../db/mysql/mysql-crud-operations';
import ConsoleLogger from '../logger/console/console.logger';
import Logger from '../logger/logger';
import MysqlExecutor from '../db/mysql/mysql-executor';
import { PaginationParams } from '../../domain/types';
import { SessionError } from '../../domain/errors';
import { RowDataPacket } from 'mysql2';

interface ActivityCountPacket extends RowDataPacket {
    count: number;
}

const className = 'MysqlActivityRepository';

@singleton()
export default class MysqlActivityRepository
    extends MysqlCrudOperations<ActivityEntity, ActivityEntityPacket>
    implements ActivityRepository
{
    constructor(@inject(ConsoleLogger) logger: Logger, @inject(MysqlExecutor) executor: MysqlExecutor) {
        super(className, logger, executor, 'session_activity');
        logger.info({ className, message: `${className} created successfully` });
    }

    async findByTags(tags: string[], pagParams: PaginationParams = { page: 1, limit: 50 }): Promise<ActivityEntity[]> {
        const method = this.findByTags.name;
        try {
            if (!tags.length) throw new SessionError('Tags list is empty');

            const sqlCount = `(SELECT COUNT(*) as count FROM activity_tag)`;
            const [{ count }] = await this._executor.bareQuery<ActivityCountPacket>({
                className,
                method,
                sql: sqlCount,
                params: [pagParams.limit, pagParams.page],
            });
            const init = Math.ceil(count / pagParams.limit) * (pagParams.page - 1);

            const sql = `select sa.* 
            from session_activity sa
            join activity_tag at2 on at2.activity_id = sa.id
            ${`where ${tags.map<string>(() => `at2.value like ?`).join(' or ')}`}
            group by sa.id limit ?, ?;`;

            const result = await this._executor.query<ActivityEntity, ActivityEntityPacket>({
                className,
                method,
                sql,
                params: [...tags.map((tag) => `%${tag}%`), init, pagParams.limit],
            });

            return result;
        } catch (error) {
            this._logger.warn({ className, method, error: <Error>error });

            throw error;
        }
    }
}
