import { IRole } from '../auth/role.interface';
import { IEntity } from '../system/entity.interface';

export interface IPerson extends IEntity {
  schoolId?: string;
  parentId: string;
  parent: IPerson;
  childrenIds: string[],
  children: Array<IPerson>,
  firstname: string;
  lastname: string;
  nationalCode: string;
  mobile: string[];
  tel: string[];
  birthDate: Date;
  roles: IRole[];
  description: string;
}
