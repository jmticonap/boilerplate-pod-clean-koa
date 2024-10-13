import { RowDataPacket } from 'mysql2/promise';
import BaseEntity from './base.entity';
import { TimeControlEntity } from './time-control.entity';

export interface UserEntity extends BaseEntity, TimeControlEntity {
    email: string;
    username: string;
    password: string;
    salt: string;
}

export interface UserEntityPacket extends UserEntity, RowDataPacket {}
