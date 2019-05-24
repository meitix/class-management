import { IRole } from '../auth/role.interface';
import { Document } from 'mongoose';

export interface IPerson extends Document {
  firstname: string;
  lastname: string;
  nationalCode: string;
  mobile: string[];
  tel: string[];
  birthDate: Date;
  roles: IRole[];
  description: string;
}
