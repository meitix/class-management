export class User {
  _id: string;
  username: string;
  password: string;
  active: boolean;
  roles: string[];
  createDate: {jy: number , jm: number , jd: number};
}
