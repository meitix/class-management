import { IClass } from './class.interface';
import { IStudent } from './student.interface';
import { IEntity } from '../system/entity.interface';

export interface IClassStatus extends IEntity{
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
