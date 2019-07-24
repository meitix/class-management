import { IGrade } from "./grade.interface";
import { IPerson } from "../people/person.interface";
import { IEntity } from "../system/entity.interface";

export interface IClass extends IEntity{
    title: string;
    grade: IGrade;
    price: number;
    students: IPerson[];
    teacher?: IPerson;
    description: string;
}