import { IPerson, Person } from './person.interface';
import { IParent } from './parent.interface';
import { ISchool } from '../edu/school.interface';
import { IStatistics } from '../edu/statistics.interface';

export interface IStudent extends IPerson {
  parent: IPerson;
  info: IPerson;
  school: ISchool;
  statistics: IStatistics;
}

export class Student extends Person implements IStudent {
  school: ISchool;
  _id?: string;
  parent: IParent;
  info: IPerson;
  statistics: IStatistics;
}
