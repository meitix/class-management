import { Injectable, Injector } from '@angular/core';
import { RestService } from '../../base/services/rest.service';
import { IRole } from '../../school-management/models/people/person.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends RestService<IRole> {
  constructor(injector: Injector) {
    super('roles', injector);
  }

  getRoles() {
    return this.get(this.url).pipe(map(res => <Array<IRole>>res));
  }
}
