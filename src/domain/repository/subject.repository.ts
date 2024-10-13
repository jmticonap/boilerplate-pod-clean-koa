import CrudOperations from '../../infrastructure/db/crud-operations';
import { SubjectEntity, SubjectEntityPacket } from '../entity/subject.entity';

export default interface SubjectRepository extends CrudOperations<SubjectEntity, SubjectEntityPacket> {}
