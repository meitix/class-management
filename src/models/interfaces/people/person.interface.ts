import { IRole } from '../auth/role.interface';
import { IEntity } from '../system/entity.interface';

export interface IPerson extends IEntity {
  firstname: string;
  lastname: string;
  nationalCode: string;
  mobile: string[];
  tel: string[];
  birthDate: Date;
  roles: IRole[];
  description: string;
}
