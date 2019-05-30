import { IPerson, Person } from './person.interface';
import { IStudent } from './student.interface';

export interface IParent extends IPerson {
  children: Array<IPerson>;
}

export class Parent extends Person implements IParent {
  children: IStudent[];
}
