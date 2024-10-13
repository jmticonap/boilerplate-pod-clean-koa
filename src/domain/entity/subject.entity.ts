import { RowDataPacket } from 'mysql2/promise';
import BaseEntity from './base.entity';

export interface SubjectEntity extends BaseEntity {
    name: string;
    cycle_id: number;
    grade_id: number;
}

export interface SubjectEntityPacket extends SubjectEntity, RowDataPacket {}
