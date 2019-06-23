import { IEntity } from './entity.interface';

export interface IAdmin extends IEntity {
  title: string;
  level: number;
  accesibility: string[];
}
