import { RowDataPacket } from 'mysql2/promise';
import BaseEntity from './base.entity';

export interface CycleEntity extends BaseEntity {
    name: string;
}

export interface CycleEntityPacket extends CycleEntity, RowDataPacket {}
