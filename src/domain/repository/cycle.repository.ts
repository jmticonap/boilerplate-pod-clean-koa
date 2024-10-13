import CrudOperations from '../../infrastructure/db/crud-operations';
import { CycleEntity, CycleEntityPacket } from '../entity/cycle.entity';

export default interface CycleRepository extends CrudOperations<CycleEntity, CycleEntityPacket> {}
