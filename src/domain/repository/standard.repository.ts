import CrudOperations from '../../infrastructure/db/crud-operations';
import { StandardEntity, StandardEntityPacket } from '../entity/standard.entity';

export default interface StandardRepository extends CrudOperations<StandardEntity, StandardEntityPacket> {}
