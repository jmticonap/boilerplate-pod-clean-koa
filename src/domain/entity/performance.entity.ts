import { RowDataPacket } from 'mysql2/promise';
import BaseEntity from './base.entity';

export interface PerformanceEntity extends BaseEntity {
    description: string;
    capability_id: number;
    grade_id: number | null;
}

export interface PerformanceEntityPacket extends PerformanceEntity, RowDataPacket {}
