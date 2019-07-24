import { IEntity } from '../system/entity.interface';
import { IGrade } from './grade.interface';
import { ISchool } from './school.interface';
import { IPerson } from '../people/person.interface';
import { IPeriod } from './period.interface';
import { IStudent } from '../people/student.interface';

export interface IClass extends IEntity {
  title: string;
  teacher: IPerson;
  students: IStudent[];
  price: number;
  school: ISchool;
  grade: IGrade;
  period: IPeriod;
  isActive: boolean;
}

export class Class implements IClass {
  title: string;
  teacher: IPerson;
  students: IStudent[];
  price: number;
  school: ISchool;
  grade: IGrade;
  period: IPeriod;
  isActive: boolean;
  _id?: string;
}
