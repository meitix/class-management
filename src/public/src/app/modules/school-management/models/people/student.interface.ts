import { IPerson, Person } from './person.interface';
import { IParent } from './parent.interface';

export interface IStudent extends IPerson {
  parent: IPerson;
}

export class Student extends Person implements IStudent {
  parent: IParent;
}
