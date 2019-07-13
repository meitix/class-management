import { IPerson } from "../people/person.interface";
import { IEntity } from "../system/entity.interface";

export interface IUser extends IEntity{
    username: string;
    password: string;
    userType: string;
    tokens: string[];
    info: IPerson;
}