import { IEntity } from '../system/entity.interface';
import { IPerson } from '../people/person.interface';

export interface ISchool extends IEntity {
  code: string;
  title: string;
  isEnable: boolean;
  boardOfTrust?: string;
  personle: IPerson[];
  students: IPerson[];
}
 