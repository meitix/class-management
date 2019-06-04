import { IEntity } from '../system/entity.interface';
import { ILesson } from './lesson.interface';

export interface IGrade extends IEntity{
    title: string;
    lessons: ILesson[];
    description?: string;
}