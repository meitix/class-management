import { IEntity } from '../system/entity.interface';

export interface IPerson extends IEntity {
  code: string;
  firstname: string;
  lastname: string;
  nationalCode: string;
  mobile: string[];
  tel: string[];
  birthDate: Date;
  roles: IRole[];
  description: string;
}

export interface IRole extends IEntity {
  title: string;
}

export class Person implements IPerson {
  code: string;
  firstname: string;
  lastname: string;
  nationalCode: string;
  mobile: string[];
  tel: string[];
  birthDate: Date = new Date();
  roles: IRole[];
  description: string;
  isEnable: boolean;
}

export class Role implements IRole {
  _id: string;
  title: string;
}
