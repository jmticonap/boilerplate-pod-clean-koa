import { inject, singleton } from 'tsyringe';
import MysqlActivityRepository from '../../infrastructure/repository/mysql-activity.repository';
import ActivityRepository from '../../domain/repository/activity.repository';
import ActivityTagRepository from '../../domain/repository/activity-tag.repository';
import MysqlActivityTagRepository from '../../infrastructure/repository/mysql-activity-tag.repository';
import ConsoleLogger from '../../infrastructure/logger/console/console.logger';
import Logger from '../../infrastructure/logger/logger';
import { ActivityRequestDtoType } from '../../domain/dto/activity-request.dto';
import { ActivityEntity } from '../../domain/entity/activity.entity';
import { SessionError } from '../../domain/errors';

const className = 'MysqlActivityService';

@singleton()
export default class MysqlActivityService {
    constructor(
        @inject(ConsoleLogger) private _logger: Logger,
        @inject(MysqlActivityRepository) public activityRepository: ActivityRepository,
        @inject(MysqlActivityTagRepository) private _activityTagRepository: ActivityTagRepository,
    ) {}

    async newActivity(activityDto: ActivityRequestDtoType): Promise<ActivityEntity> {
        const method = this.newActivity.name;
        try {
            const activity: ActivityEntity = {
                title: activityDto.title,
                estimate_time: activityDto.estimate_time || 5,
                description: activityDto.description,
                active: activityDto.active || true,
            };
            const newAct = await this.activityRepository.insert(activity);
            if (Array.isArray(newAct)) throw new SessionError('Array return is not suported');

            for (const tag of activityDto.tags) {
                await this._activityTagRepository.insert({
                    value: tag,
                    activity_id: newAct.id!,
                });
            }

            return newAct;
        } catch (error) {
            this._logger.warn({ className, method, error: <Error>error });

            throw error;
        }
    }
}
