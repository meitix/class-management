import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerConfig } from '../../../app-config/server-config';
import { IRole } from '../../school-management/models/people/person.interface';
import { SchoolService } from '../../school-management/components/school/services/school.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private currentUser: ILoginResult;
  private serverUrl: string;

  constructor(private http: HttpClient, private schoolService: SchoolService) {
    this.serverUrl = ServerConfig.serverUrl;
  }

  getCurrentUser(): ILoginResult {
    const localUserStr = localStorage.getItem('currentUser');
    if (!localUserStr) {
      return null;
    }
    this.currentUser = JSON.parse(localUserStr);
    return this.currentUser;
  }

  setCurrentUser(user: ILoginResult) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  login(username: string, password: string) {
    return this.http.post<ILoginResult>(
      this.serverUrl.concat('auth', '/', 'login'),
      {
        username: username,
        password: password
      }
    );
  }

  makeUserRemembered(user: ILoginResult) {
    this.currentUser = user;
    localStorage.setItem('rememberedUser', JSON.stringify(user));
  }

  getRememberedUser(): ILoginResult {
    const localUserStr = localStorage.getItem('rememberedUser');
    if (!localUserStr) {
      return null;
    }
    this.currentUser = JSON.parse(localUserStr);
    return this.currentUser;
  }

  logout() {
    localStorage.clear();
    this.schoolService.removeAuthToken();
  }
}

export interface ILoginResult {
  token: string;
  schoolId: string;
  roles: IRole[];
}
