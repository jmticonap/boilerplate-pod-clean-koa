import CrudOperations from '../../infrastructure/db/crud-operations';
import { ActivityEntity, ActivityEntityPacket } from '../entity/activity.entity';
import { PaginationParams } from '../types';

export default interface ActivityRepository extends CrudOperations<ActivityEntity, ActivityEntityPacket> {
    findByTags(tags: string[], pagParams: PaginationParams): Promise<ActivityEntity[]>;
}
