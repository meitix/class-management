import { Injector } from '@angular/core';
import { HttpClient , HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

export abstract class RestService<T> {
  private serverUrl = 'http://localhost:3000/';
  protected url: string;
  protected http: HttpClient;
  protected requestOption: object;

  constructor(entityName: string, injector: Injector) {
    // create service complete url.
    this.url = this.serverUrl.concat(entityName + '/');
    // inject HttpClient;
    this.http = injector.get(HttpClient);
    // initial request options.
    this.requestOption = {};
  }

  fetch() {
    return this.http.get(this.url, this.requestOption).pipe(map((res: any) => <Array<T>>res));
  }

  fetchById(id: string) {
    return this.http.get(this.url.concat(`${id}`)).pipe(map((res: any) => <T>res));
  }

  create(entity: T) {

    return this.http.post(this.url, entity, this.requestOption).pipe(map((res: any) => <T>res));
  }

  update(id: string, entity: T) {
    return this.http.put(this.url.concat(`${id}`), entity, this.requestOption);
  }

  delete(id: string) {
    return this.http.delete(this.url.concat(`${id}`), this.requestOption);
  }
}
