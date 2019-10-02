import { IEntity } from '../system/entity.interface';
import { IClass } from './class.interface';
import { IStudent } from '../people/student.interface';

export interface IClassStatus extends IEntity {
  class: IClass;
  statistics: IStatistic[];
  date: Date;
}

export interface IStatistic {
  student: IStudent;
  result: {
    homework: boolean;
    present: boolean;
    lesson: boolean;
  };
  description?: string;
}

export type IStatistics = Array<IStatistic>;
