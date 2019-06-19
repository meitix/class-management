import { IEntity } from '../system/entity.interface';
import { IGrade } from './grade.interface';
import { ISchool } from './school.interface';
import { IPerson } from '../people/person.interface';

export interface IClass extends IEntity {
  title: string;
  teacher: IPerson;
  school: ISchool;
  grade: IGrade;
  period: string;
  isActive: boolean;
}

export class Class implements IClass {
  title: string;
  teacher: IPerson;
  school: ISchool;
  grade: IGrade;
  period: string;
  isActive: boolean;
  _id?: string;
}
