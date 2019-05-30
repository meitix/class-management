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

  // add a student to an school.
  addStudent(schoolId: string, student: IStudent) {
     return this.post(this.url.concat(schoolId, '/students') , student).pipe(map(res => <IStudent>res));
  }

  // update an student.
  updateStudent(schoolId: string , studentId: string , student: IStudent) {
   return this.put(`${this.url + schoolId}/student/${studentId}` , student).pipe(map(res => <IStudent>res));
  }

  // get all students of an school.
  getStudents(schoolId: string) {
    return this.get(`${this.url + schoolId}/students`).pipe(map(res => <Array<IStudent>>res));
  }

  // get single student.
  getStudent(studentId: string): any {
    return this.get(`${this.url}student/${studentId}`).pipe(map(res => <IStudent>res));
  }

  // delete a single student.
  deleteStudent(schoolId: string, studentId: string) {
   return this.delete(`${this.url + schoolId}/student/${studentId}`);
  }
}
