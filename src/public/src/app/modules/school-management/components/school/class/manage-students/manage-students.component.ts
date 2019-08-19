import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { IClass } from 'src/app/modules/school-management/models/edu/class.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { IStudent, Student } from 'src/app/modules/school-management/models/people/student.interface';
import { remove } from 'lodash';
import { ErrorService } from 'src/app/modules/base/services/error.service';
import { flatten } from 'lodash';
import { IPerson } from 'src/app/modules/school-management/models/people/person.interface';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent implements OnInit {
  class: IClass;
  classIdSubscription: Subscription;
  isLoading: boolean; // is processing indicator.
  people: IPerson[];
  constructor(
    private schoolService: SchoolService,
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {
    this.people = [];
  }

  ngOnInit() {
    this.route.params.pipe(take(1)).subscribe(async params => {
      if (params.id) {
        this.class = await this.fetchClassData(params.id);
        this.people = this.initPeopleInClass(this.class);
      }
    });
  }

  // add student to class.
  assignStudentToClass(student: IStudent) {
    this.class.students = this.class.students || [];
    this.class.students.push(student);
  }

  // remove student from class.
  removeStudentFromClass(student: IStudent) {
    this.class.students = remove(
      this.class.students,
      s => s._id === student._id
    );
  }

  // get class data from server.
  async fetchClassData(classId: string) {
    // enable loading.
    this.enableLoadingMode();
    let _class;
    try {
      // get data from server.
      _class = await this.schoolService
        .getClassById(this.schoolService.getSelectedSchoolId(), classId)
        .toPromise();
    } catch (e) {
      this.errorService.handle(e, 'خطا در دریافت اطلاعات');
    }
    this.disableLoadingMode();
    return _class;
  }

  initPeopleInClass(_class: IClass): IPerson[] {
    return flatten(_class.students.map(s => s.info));
  }

  // update class after changes.
  async saveChanges() {
    const result = await this.schoolService
      .updateClass(
        this.schoolService.getSelectedSchoolId(),
        this.class._id,
        this.class
      )
      .toPromise();
  }

  // set page to loading mode.
  enableLoadingMode() {
    this.isLoading = true;
  }

  // disable the loading mode.
  disableLoadingMode() {
    this.isLoading = false;
  }
}
