import { RowDataPacket } from 'mysql2/promise';
import BaseEntity from './base.entity';
import { TimeControlEntity } from './time-control.entity';

export interface ActivityEntity extends BaseEntity, TimeControlEntity {
    title: string;
    estimate_time: number;
    description: string;
    active: boolean;
}

export interface ActivityEntityPacket extends ActivityEntity, RowDataPacket {}
