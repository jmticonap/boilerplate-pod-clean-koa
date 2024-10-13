import CrudOperations from '../../infrastructure/db/crud-operations';
import { ActivityTagEntity, ActivityTagEntityPacket } from '../entity/activity-tag.entity';

export default interface ActivityTagRepository extends CrudOperations<ActivityTagEntity, ActivityTagEntityPacket> {}
