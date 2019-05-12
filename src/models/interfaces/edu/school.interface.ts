import { IEntity } from "../system/entity.interface";
import { IEmploee } from "../people/personel.interface";
import { IStudent } from "../people/student.interface";

export interface ISchool extends IEntity{
    code: string;
    title: string;
    isEnable: boolean;
    boardOfTrust?: string;
    personle: IEmploee[];
    students: IStudent[];
}