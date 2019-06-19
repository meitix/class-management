import { Injectable, Injector } from '@angular/core';
import { RestService } from 'src/app/modules/base/services/rest.service';
import { ISchool } from '../../../models/edu/school.interface';
import { IStudent } from '../../../models/people/student.interface';
import { map } from 'rxjs/operators';
import { IPerson } from '../../../models/people/person.interface';
import { IPersonnelViewModel } from '../../../models/people/personnel.interface';
import { IClass } from '../../../models/edu/class.interface';
import { stringify } from 'querystring';

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

  // get personnel.
  getPersonnel(schoolId: string, filter?: any) {
    return this.get(`${this.url + schoolId}/personnel/?${stringify(filter)}`).pipe(map(res => <Array<IPersonnelViewModel>>res));
  }

  getSinglePersonnel(schoolId: string, personnelId: string) {
    return this.get(`${this.url + schoolId}/personnel/${personnelId}`).pipe(map(res => <IPersonnelViewModel>res));
  }
  // add personnel to school.
  addPersonnel(schoolId: string, person: IPerson, roleIds: string[]) {
    return this.post(`${this.url + schoolId}/personnel`, {person , roleIds});
  }
  // update personnel.
  updatePersonnel(schoolId: string, personId: string, person: IPerson, roleIds: string[]) {
    return this.put(`${this.url + schoolId}/personnel/${personId}`, {person , roleIds});
  }

  // create class.
  createClass(schoolId: string , _class: IClass) {
    return this.post(`${this.url + schoolId}/classes`, _class);
   }

   // update class.
  updateClass(schoolId: string , classId: string, _class: IClass) {
    return this.put(`${this.url + schoolId}/classes/${classId}`, _class);
  }

  // get class by id.
  getClassById(schoolId , classId: string) {
    return this.get(`${this.url + schoolId }/classes/${classId}`).pipe(map(res => <IClass>res));
  }

  // get class by school id.
  getClassesBySchoolId(schoolId: string) {
    return this.get(`${this.url + schoolId}/classes`).pipe(map(res => <IClass[]>res));
  }

  // search personnel of an school.

  searchPersonnel(schoolId: string, term: string) {
    return this.get(`${this.url + schoolId}/personnel/search/${term}`).pipe(map(res => <Array<IPerson>>res));
  }
}
