import { Injectable } from '@angular/core';
import { User } from '../../users/models/user';
import { HttpClient } from '@angular/common/http';
import { ServerConfig } from '../../../app-config/server-config';

@Injectable()
export class AuthService {
  private currentUser: User;
  private serverUrl: string;

  constructor(private http: HttpClient) {
    this.serverUrl = ServerConfig.serverUrl;
  }

  getCurrentUser(): User {
    const localUserStr = localStorage.getItem('currentUser');
    if (!localUserStr) {
      return null;
    }
    this.currentUser = JSON.parse(localUserStr);
    return this.currentUser;
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  login(username: string, password: string) {
    return this.http
      .post<User>(this.serverUrl.concat('auth', '/', 'login'), {
        username: username,
        password: password
      });
  }

  register(username: string, password: string) {
    return this.http
      .post<User>(this.serverUrl.concat('register'), {
        username: username,
        password: password
      });
  }

  makeUserRemembered(user: User) {
    this.currentUser = user;
    localStorage.setItem('rememberedUser', JSON.stringify(user));
  }

  getRememberedUser(): User {
    const localUserStr = localStorage.getItem('rememberedUser');
    if (!localUserStr) {
      return null;
    }
    this.currentUser = JSON.parse(localUserStr);
    return this.currentUser;
  }
}
