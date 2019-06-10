import { IEntity } from '../system/entity.interface';
import { IPerson } from '../people/person.interface';
import { IStatistics } from './statistics.interface';

export interface IStudent extends IEntity {
  info: IPerson;
  parent: IPerson;
  statistics: IStatistics;
  description?: string;
}
