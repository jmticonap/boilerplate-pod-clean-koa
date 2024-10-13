import CrudOperations from '../../infrastructure/db/crud-operations';
import { CapabilityEntity, CapabilityEntityPacket } from '../entity/capability.entity';

export default interface CapabilityRepository extends CrudOperations<CapabilityEntity, CapabilityEntityPacket> {}
