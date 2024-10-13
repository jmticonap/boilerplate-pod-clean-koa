import { RowDataPacket } from 'mysql2/promise';
import BaseEntity from './base.entity';

export interface GradeEntity extends BaseEntity {
    name: string;
    cycle_id: number;
}

export interface GradeEntityPacket extends GradeEntity, RowDataPacket {}
