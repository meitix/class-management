import { IEntity } from '../system/entity.interface';
import { IPerson } from '../people/person.interface';

export interface ISchool extends IEntity {
  code: string;
  title: string;
  isEnable: boolean;
  boardOfTrust?: string;
  personnelList: IPerson[];
  students: IPerson[];
  personnel: { personId: string; roleIds: string[] };
}

export class School implements ISchool {
  _id?: string;
  code: string;
  title: string;
  isEnable: boolean;
  boardOfTrust?: string;
  personnelList: IPerson[];
  students: IPerson[];
  personnel: { personId: string; roleIds: string[]; };
}
