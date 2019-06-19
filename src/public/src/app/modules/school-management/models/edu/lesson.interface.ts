import { IEntity } from '../system/entity.interface';
import { IPractice } from './practice.interface';

export interface ILesson extends IEntity {
  title: string;
  practices: IPractice[];
  description?: string;
}

export class Lesson implements ILesson {
  title: string;  practices: IPractice[];
  description?: string;
  _id?: string;
}
