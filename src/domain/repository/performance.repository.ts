import CrudOperations from '../../infrastructure/db/crud-operations';
import { PerformanceEntity, PerformanceEntityPacket } from '../entity/performance.entity';

export default interface PerformanceRepository extends CrudOperations<PerformanceEntity, PerformanceEntityPacket> {}
