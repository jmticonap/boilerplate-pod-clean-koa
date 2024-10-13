import { RowDataPacket } from 'mysql2/promise';
import BaseEntity from './base.entity';

export interface TransversalApproachEntity extends BaseEntity {
    description: string;
    subject_id: number;
}

export interface TransversalApproachEntityPacket extends TransversalApproachEntity, RowDataPacket {}
