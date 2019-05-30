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

export interface IRole {
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
  title: string;
}
