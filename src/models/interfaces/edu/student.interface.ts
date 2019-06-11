import { IEntity } from '../system/entity.interface';
import { IPerson } from '../people/person.interface';
import { IStatistics } from './statistics.interface';
import { ISchool } from './school.interface';

export interface IStudent extends IEntity {
  info: IPerson;
  school: ISchool;
  parent: IPerson;
  statistics: IStatistics;
  description?: string;
}
