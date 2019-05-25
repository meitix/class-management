import { Injectable, Injector } from '@angular/core';
import { RestService } from 'src/app/modules/base/services/rest.service';
import { ISchool } from '../../../models/edu/school.interface';

@Injectable({
  providedIn: 'root'
})
export class SchoolService extends RestService<ISchool> {
  constructor(injector: Injector) {
    super('school', injector);
  }
}
