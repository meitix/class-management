import { Injector } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServerConfig } from 'src/app/app-config/server-config';
import { stringify } from 'query-string';
import { AuthService } from '../../authentication/services/auth.service';

export abstract class RestService<T> {
  private serverUrl = ServerConfig.serverUrl;
  protected url: string;
  protected http: HttpClient;
  protected requestOption: object;
  private authService: AuthService;

  constructor(entityName: string, injector: Injector) {
    // create service complete url.
    this.url = this.serverUrl.concat(entityName + '/');
    // inject HttpClient;
    this.http = injector.get(HttpClient);
    this.authService = injector.get<AuthService>(AuthService);
    // initial request options.
    this.requestOption = this.initRequestOption();
  }

  private initRequestOption() {
    const options: any = {headers: {}};
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) { options.headers.Authorization = `Bearer ${currentUser.token}`; }

    return options;
  }

  // basic http requests.
  protected post(url: string, data: any) {
    return this.http.post(url, data, {});
  }

  protected get<P>(url: string) {
    return this.http.get<P>(url, this.requestOption);
  }

  protected put(url: string, data: any) {
    return this.http.put(url, data, this.requestOption);
  }

  protected delete(url: string) {
    return this.http.delete(url, this.requestOption);
  }

  // operational methods.
  fetch(filter?: any) {
    return this.http
      .get(this.url + `?${stringify(filter)}`, this.requestOption)
      .pipe(map((res: any) => <Array<T>>res));
  }

  fetchById(id: string) {
    return this.get(this.url.concat(`${id}`)).pipe(map((res: any) => <T>res));
  }

  create(entity: T) {
    return this.post(this.url, entity).pipe(map((res: any) => <T>res));
  }

  update(id: string, entity: T) {
    return this.http
      .put(this.url.concat(`${id}`), entity, this.requestOption)
      .pipe(map((res: any) => <T>res));
  }

  remove(id: string) {
    return this.delete(this.url.concat(`${id}`));
  }
}
