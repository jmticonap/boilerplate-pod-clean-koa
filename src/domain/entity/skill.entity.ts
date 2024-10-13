import { RowDataPacket } from 'mysql2/promise';
import BaseEntity from './base.entity';

export interface SkillEntity extends BaseEntity {
    description: string;
    subject_id: number;
}

export interface SkillEntityPacket extends SkillEntity, RowDataPacket {}
