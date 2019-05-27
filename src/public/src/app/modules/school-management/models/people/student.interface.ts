import { IPerson } from './person.interface';
import { IParent } from './parent.interface';

export interface IStudent extends IPerson {
  parent: IPerson;
}

export class Student implements IStudent {
  parent: IParent;
  firstname: string;
  lastname: string;
  nationalCode: string;
  mobile: string[];
  tel: string[];
  birthDate: Date;
  roles: import('./person.interface').IRole[];
  description: string;
  _id?: string;
}
