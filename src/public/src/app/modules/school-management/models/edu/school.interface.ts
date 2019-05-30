import { IEntity } from '../system/entity.interface';
import { IPerson } from '../people/person.interface';

export interface ISchool extends IEntity {
  code: string;
  title: string;
  isEnable: boolean;
  boardOfTrust?: string;
  personnel: IPerson[];
  students: IPerson[];
}

export class School implements ISchool {
  code: string;
  title: string;
  isEnable: boolean;
  boardOfTrust?: string;
  personnel: IPerson[];
  students: IPerson[];

  constructor() {

  }
}
