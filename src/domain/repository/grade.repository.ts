import CrudOperations from '../../infrastructure/db/crud-operations';
import { GradeEntity, GradeEntityPacket } from '../entity/grade.entity';

export default interface GradeRepository extends CrudOperations<GradeEntity, GradeEntityPacket> {}
