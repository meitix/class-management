import { IEntity } from '../system/entity.interface';
import { ISchool } from './school.interface';

export interface IPeriod extends IEntity {
  school: ISchool;
  title: string;
}

export class Period implements IPeriod {
  school: ISchool;
  title: string;
}
