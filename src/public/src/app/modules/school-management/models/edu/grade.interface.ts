import { IEntity } from '../system/entity.interface';
import { ILesson } from './lesson.interface';

export interface IGrade extends IEntity {
  title: string;
  lessons?: ILesson[];
  description?: string;
}

export class Grade implements IGrade {
  _id?: string;
  title: string;
  lessons?: ILesson[];
  description?: string;
}
