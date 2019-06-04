import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { HttpRequestResult } from '../../../models/http-request-result';
import { User } from '../models/user';
import { Roles } from '../seed-data/roles';
import { ServerConfig } from '../../../app-config/server-config';
import { from } from 'rxjs';

@Injectable()
export class UserService {
  private serverUrl: string;

  constructor(private http: HttpClient) {
    this.serverUrl = ServerConfig.serverUrl;
  }

  create(username: string, password: string) {
    return this.http
      .post(this.serverUrl.concat('createUser'), {
        username: username,
        password: password
      })
      .pipe(map(
        (res: any) => {
          return <HttpRequestResult>res.json();
        },
        err => {
          console.log(err);
        })
      );
  }

  getAllUsers() {
    return this.http.get(this.serverUrl.concat('getAllUsers')).pipe(map(
      (res: any) => {
        const reqRes = <HttpRequestResult> res.json();
        return <User[]> reqRes.data;
      },
      err => {
        console.log(err);
      })
    );
  }

  getUserById(id: string) {
    return this.http.get(this.serverUrl.concat('getUser', '/', id)).pipe(map(
        (res: any) => {
          const resData = <HttpRequestResult> res.json();
          return <User> resData.data;
        },
        err => {
          console.log(err);
        })
    );
  }

  getRoles(): string[] {
    return Roles;
  }

  search(username: string) {
    return this.http.get(this.serverUrl.concat('searchUsers', '/' , username)).pipe(map(
      (res: any) => {
        return <User[]> (<HttpRequestResult> res.json()).data;
      })
    );
  }


}
