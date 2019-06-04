import { IPerson } from './person.interface';

export interface IPersonnelViewModel {
  person: IPerson;
  roles: {
    _id: string;
    title: string;
    accessibility: { accessLevel: number; title: string; _id: string }[];
  }[];
}
