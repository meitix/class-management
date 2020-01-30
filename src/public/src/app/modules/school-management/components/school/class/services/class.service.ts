import { Injectable, Injector } from '@angular/core';
import { RestService } from 'src/app/modules/base/services/rest.service';
import { IClass } from 'src/app/modules/school-management/models/edu/class.interface';

@Injectable({
  providedIn: 'root'
})
export class ClassService extends RestService<IClass> {
  constructor(injector: Injector) {
    super('class', injector);
  }
  appenAuthToken() {
    this.requestOption = this.initRequestOption();
  }
}
