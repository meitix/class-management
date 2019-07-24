import { IPerson, Person } from './person.interface';
import { IParent } from './parent.interface';
import { ISchool } from '../edu/school.interface';
import { IStatistics } from '../edu/statistics.interface';
import { IPeriod } from '../edu/period.interface';

export interface IStudent extends IPerson {
  parent: IPerson;
  info: IPerson;
  school: ISchool;
  period: IPeriod;
  statistics: IStatistics;
}

export class Student extends Person implements IStudent {
  period: IPeriod;
  school: ISchool;
  _id?: string;
  parent: IParent;
  info: IPerson;
  statistics: IStatistics;
}
