import { IEntity } from '../system/entity.interface';

export interface IPerson extends IEntity {
  code: string;
  firstname: string;
  lastname: string;
  nationalCode: string;
  mobile: string[];
  tel: string[];
  birthDate: any;
  roles: IRole[];
  description: string;
}

export interface IRole extends IEntity {
  _id: string;
  title: string;
  accessibility: Array<{_id: string, title: string, accessLevel: number}>;
}

export class Person implements IPerson {
  code: string;
  firstname: string;
  lastname: string;
  nationalCode: string;
  mobile: string[];
  tel: string[];
  birthDate: Date;
  roles: IRole[];
  description: string;
  isEnable: boolean;
}

export class Role implements IRole {
  accessibility: { _id: string; title: string; accessLevel: number; }[];
  _id: string;
  title: string;
}
