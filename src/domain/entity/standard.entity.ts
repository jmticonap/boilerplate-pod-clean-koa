import { RowDataPacket } from 'mysql2/promise';
import BaseEntity from './base.entity';

export interface StandardEntity extends BaseEntity {
    description: string;
    capability_id: number;
}

export interface StandardEntityPacket extends StandardEntity, RowDataPacket {}
