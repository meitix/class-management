import { IEntity } from "../system/entity.interface";

export interface IPractice extends IEntity {
    title: string;
    homework: boolean;
    description?: string;
}