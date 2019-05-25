import { IEntity } from "../system/entity.interface";
import { IPractice } from "./practice.interface";

export interface ILesson extends IEntity {
    title: string;
    practices: IPractice[];
    description?: string;
}