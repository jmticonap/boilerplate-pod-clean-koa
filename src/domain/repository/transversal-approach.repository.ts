import CrudOperations from '../../infrastructure/db/crud-operations';
import { TransversalApproachEntity, TransversalApproachEntityPacket } from '../entity/transversal-approach.entity';

export default interface TransversalApproachRepository
    extends CrudOperations<TransversalApproachEntity, TransversalApproachEntityPacket> {}
