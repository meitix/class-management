import { Document } from 'mongoose';
export interface IEntity extends Document{
    _id: string;
}