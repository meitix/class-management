import { IEntity } from '../system/entity.interface';
import { IPerson } from '../people/person.interface';
import { IRole } from '../auth/role.interface';

export interface ISchool extends IEntity {
  code: string;
  title: string;
  isEnable: boolean;
  boardOfTrust?: string;
  personnel:{person: IPerson, roles: IRole[]}[];
  students: IPerson[];
}
 