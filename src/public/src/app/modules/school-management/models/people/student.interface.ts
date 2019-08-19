import { IPerson, Person } from './person.interface';
import { ISchool } from '../edu/school.interface';
import { IStatistics } from '../edu/statistics.interface';
import { IPeriod } from '../edu/period.interface';
import { IEntity } from '../system/entity.interface';

export interface IStudent extends IEntity {
  parent: IPerson;
  info: IPerson;
  school: ISchool;
  period: IPeriod;
  statistics: IStatistics;
}

export class Student implements IStudent {
  period: IPeriod;
  school: ISchool;
  _id?: string;
  parent: Person;
  info: IPerson;
  statistics: IStatistics;
}
