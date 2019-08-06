import { IEntity } from "../system/entity.interface";

export interface IRole extends IEntity{
    title: string;
    accessibility: { title: string, accessLevel: number}[];
}