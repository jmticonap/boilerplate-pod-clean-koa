import { RowDataPacket } from 'mysql2/promise';
import BaseEntity from './base.entity';
import { TimeControlEntity } from './time-control.entity';

export interface CapabilityEntity extends BaseEntity, TimeControlEntity {
    description: string;
    skill_id: number;
}

export interface CapabilityEntityPacket extends CapabilityEntity, RowDataPacket {}
