import { Injectable, Injector } from '@angular/core';
import { RestService } from 'src/app/modules/base/services/rest.service';
import { IGrade } from 'src/app/modules/school-management/models/edu/grade.interface';

@Injectable({
  providedIn: 'root'
})
export class GradeService extends RestService<IGrade>{

  constructor(injector: Injector) {
    super('grades', injector);
   }
}
