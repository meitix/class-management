import { Injectable, Injector } from '@angular/core';
import { RestService } from 'src/app/modules/base/services/rest.service';
import { ISchool } from '../../../models/edu/school.interface';
import { IStudent } from '../../../models/people/student.interface';
import { map } from 'rxjs/operators';
import { IPerson } from '../../../models/people/person.interface';
import { IPersonnelViewModel } from '../../../models/people/personnel.interface';
import { IClass } from '../../../models/edu/class.interface';
import { stringify } from 'querystring';
import { IPeriod } from '../../../models/edu/period.interface';
import { EventEmitter } from '@angular/core';
import { IClassStatus, IStatistics } from '../../../models/edu/statistics.interface';

@Injectable({
  providedIn: 'root'
})
export class SchoolService extends RestService<ISchool> {

  constructor(injector: Injector) {
    super('school', injector);
    this.schoolSelected = new EventEmitter<string>();
  }

  private schoolId: string;

  schoolSelected: EventEmitter<string>;

  periodSelected = new EventEmitter<IPeriod>();

  getSelectedSchoolId(): string {
    return this.schoolId;
  }

  /*
    آی دی مدرسه ای که انتخاب شده با این تابع از طریق یه ایونت فایر میشه
    برای اینکه کامپوننت هایی که به آدرس دسترسی ندارن یا قبل از آدرس مدرسه لود میشن مثل دوره ها
  */
  selectSchool(schoolId: string) {
    this.schoolId = schoolId;
    this.schoolSelected.emit(schoolId);
  }

  // add a student to an school.
  addStudent(schoolId: string, student: IStudent) {
    student.period = this.getSelectedPeriod();
    return this.post(this.url.concat(schoolId, '/students'), student).pipe(
      map(res => <IStudent>res)
    );
  }

  // update an student.
  updateStudent(schoolId: string, studentId: string, student: IStudent) {
    return this.put(
      `${this.url + schoolId}/student/${studentId}`,
      student
    ).pipe(map(res => <IStudent>res));
  }

  // get all students of an school.
  getStudents(schoolId: string, query?: string) {
    return this.get(
      `${this.url + schoolId}/students?query=${query || ''}`
    ).pipe(map(res => <Array<IStudent>>res));
  }

  // get single student.
  getStudent(studentId: string): any {
    return this.get(`${this.url}student/${studentId}`).pipe(
      map(res => <IStudent>res)
    );
  }

  // delete a single student.
  deleteStudent(schoolId: string, studentId: string) {
    return this.delete(`${this.url + schoolId}/student/${studentId}`);
  }

  // get personnel.
  getPersonnel(schoolId: string, filter?: any) {
    return this.get(
      `${this.url + schoolId}/personnel/?${stringify(filter)}`
    ).pipe(map(res => <Array<IPersonnelViewModel>>res));
  }

  getSinglePersonnel(schoolId: string, personnelId: string) {
    return this.get(`${this.url + schoolId}/personnel/${personnelId}`).pipe(
      map(res => <IPersonnelViewModel>res)
    );
  }
  // add personnel to school.
  addPersonnel(schoolId: string, person: IPerson, roleIds: string[]) {
    return this.post(`${this.url + schoolId}/personnel`, { person, roleIds });
  }
  // update personnel.
  updatePersonnel(
    schoolId: string,
    personId: string,
    person: IPerson,
    roleIds: string[]
  ) {
    return this.put(`${this.url + schoolId}/personnel/${personId}`, {
      person,
      roleIds
    });
  }

  deletePersonnel(schoolId: string, personnelId: string) {
    return this.delete(`${this.url + schoolId}/personnel/${personnelId}`);
  }

  // search personnel of an school.
  searchPersonnel(schoolId: string, term: string) {
    return this.get(`${this.url + schoolId}/personnel/search/${term}`).pipe(
      map(res => <Array<IPerson>>res)
    );
  }

  // create class.
  createClass(schoolId: string, _class: IClass) {
    _class.period = this.getSelectedPeriod();
    return this.post(`${this.url + schoolId}/classes`, _class);
  }

  // update class.
  updateClass(schoolId: string, classId: string, _class: IClass) {
    return this.put(`${this.url + schoolId}/classes/${classId}`, _class);
  }

  // get class by id.
  getClassById(schoolId, classId: string) {
    return this.get(`${this.url + schoolId}/classes/${classId}`).pipe(
      map(res => <IClass>res)
    );
  }

  // get class by school id.
  getClassesBySchoolId(schoolId: string, periodId: string) {
    return this.get(`${this.url + schoolId}/classes?period=${periodId}`).pipe(
      map(res => <IClass[]>res)
    );
  }

  getClassStatus(schoolId: string, classId: string) {
    return this.get(`${this.url + schoolId}/classes/${classId}/status`);
  }

  getStatusById(schoolId: string, classId: string, statusId: string) {
    return this.get<IClassStatus>(`${this.url + schoolId}/classes/${classId}/status/${statusId}`);
  }

  createClassStatus(
    schoolId: string,
    classId: string,
    classStatus: IClassStatus
  ) {
    return this.post(
      `${this.url + schoolId}/classes/${classId}/status`,
      classStatus
    );
  }

  updateStatistics(schoolId: string, classId: string, statusId: string, statistics: IStatistics) {
    return this.put(`${this.url + schoolId}/classes/${classId}/status/${statusId}/statistics`, statistics);
  }

  // Period service.

  // create period.
  createPeriod(schoolId: string, _period: IPeriod) {
    return this.post(`${this.url + schoolId}/periods`, _period);
  }

  // update period.
  updatePeriod(schoolId: string, periodId: string, _period: IPeriod) {
    return this.put(`${this.url + schoolId}/periods/${periodId}`, _period);
  }

  // get period by id.
  getPeriodById(schoolId, periodId: string) {
    return this.get(`${this.url + schoolId}/periods/${periodId}`).pipe(
      map(res => <IPeriod>res)
    );
  }

  // get period by school id.
  getPeriodsBySchoolId(schoolId: string) {
    return this.get(`${this.url + schoolId}/periods`).pipe(
      map(res => <IPeriod[]>res)
    );
  }

  // delete period.
  deletePeriod(schoolId: string, periodId: string) {
    return this.delete(`${this.url + schoolId}/periods/${periodId}`);
  }

  // get selected period id from local storage.
  getSelectedPeriod() {
    return JSON.parse(localStorage.getItem('selectedPeriod'));
  }

  setSelectedPeriod(period: IPeriod) {
    this.periodSelected.emit(period);
    localStorage.setItem('selectedPeriod', JSON.stringify(period));
  }
}
