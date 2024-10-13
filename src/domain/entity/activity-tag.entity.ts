import { RowDataPacket } from 'mysql2/promise';
import BaseEntity from './base.entity';

export interface ActivityTagEntity extends BaseEntity {
    value: string;
    activity_id: number;
}

export interface ActivityTagEntityPacket extends ActivityTagEntity, RowDataPacket {}
