import { IPerson } from './person.interface';
import { IStudent } from './student.interface';

export interface IParent extends IPerson {
  children: Array<IPerson>;
}

export class Parent implements IParent {
  children: IStudent[];
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
