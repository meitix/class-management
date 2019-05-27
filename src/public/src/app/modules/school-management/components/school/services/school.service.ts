import { Injectable, Injector } from '@angular/core';
import { RestService } from 'src/app/modules/base/services/rest.service';
import { ISchool } from '../../../models/edu/school.interface';
import { IStudent } from '../../../models/people/student.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchoolService extends RestService<ISchool> {
  constructor(injector: Injector) {
    super('school', injector);
  }

  addStudent(schoolId: string, student: IStudent) {
     return this.post(this.url.concat(schoolId, '/students') , student).pipe(map(res => {
       console.log(res);
       return res;
     }));
  }
}
