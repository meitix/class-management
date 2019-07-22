import { IClass } from './class.interface';
import { IStudent } from './student.interface';
import { IEntity } from '../system/entity.interface';

export interface IStudentStatus extends IEntity{
  class: IClass;
  student: IStudent;
  result: {
    homework: boolean;
    present: boolean;
    lesson: boolean;
  };
  description?: string;
  date: Date;
}

export interface IStatistic {
  class: IClass;
  statuses: Array<IStudentStatus>;
}

export type IStatistics = Array<IStatistic>;
