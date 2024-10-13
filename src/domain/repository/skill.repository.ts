import CrudOperations from '../../infrastructure/db/crud-operations';
import { SkillEntity, SkillEntityPacket } from '../entity/skill.entity';

export default interface SkillRepository extends CrudOperations<SkillEntity, SkillEntityPacket> {}
