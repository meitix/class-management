import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorService } from 'src/app/modules/base/services/error.service';
import {
  IClass,
  Class
} from 'src/app/modules/school-management/models/edu/class.interface';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from '../../services/school.service';
import { GradeService } from '../../grades/services/grade.service';
import { IPerson } from 'src/app/modules/school-management/models/people/person.interface';

@Component({
  selector: 'app-class-create',
  templateUrl: './class-create.component.html',
  styleUrls: ['./class-create.component.css']
})
export class ClassCreateComponent implements OnInit, OnDestroy {
  constructor(
    private schoolService: SchoolService,
    private route: ActivatedRoute,
    private errorService: ErrorService,
    private gradeService: GradeService,
    private teacherService: SchoolService
  ) {
    this.class = new Class();
  }
  isProcessing: boolean;
  classId: string;

  isTeacherSearchMode: boolean;
  class: IClass;
  classIdSubscription: Subscription;
  schoolIdSubscription: Subscription;
  schoolId: string;
  grades: any;

  async ngOnInit() {
    // get school id from route.
    this.schoolIdSubscription = this.route.parent.params.subscribe(params => {
      this.schoolId = params.id;
    });
    // get class id from route.
    this.classIdSubscription = this.route.params.subscribe(params => {
      // didn't use parent on route object so in path '/class/:id' we need to read the id parameter.
      this.classId = params.id;
      if (this.classId) {
        this.fetchClass(this.schoolId, this.classId);
      }
    });

    // fetch grades to fill out the dropbox.
    this.fetchGrades();
  }

  // fetch grades.
  async fetchGrades() {
    this.grades = (await this.gradeService.fetch().toPromise()).map(g => ({
      id: g._id,
      text: g.title
    }));
  }

  // fetch class for edit.
  async fetchClass(schoolId: string, classId: string) {
    this.class = await this.schoolService
      .getClassById(schoolId, classId)
      .toPromise();
  }

  // assign teacher to class.
  selectTeacher(teacher: IPerson) {
    this.class.teacher = teacher;
    this.disableTeacherSearchMode();
  }

  // submit form.
  async submit() {
    let req = this.schoolService.createClass(this.schoolId, this.class);
    if (this.classId) {
      req = this.schoolService.updateClass(
        this.classId,
        this.classId,
        this.class
      );
    }
    try {
      this.isProcessing = true;
      const res = await req.toPromise();
      this.isProcessing = false;
      alert('کلاس با موفقیت ثبت شد');
    } catch (e) {
      this.errorService.handle(e, 'مشکل در اتصال به سرور');
    }
  }

  // toggle teacher search mode.
  gotoTeacherSearchMode() {
    this.isTeacherSearchMode = true;
  }

  disableTeacherSearchMode() {
    this.isTeacherSearchMode = false;
  }
  ngOnDestroy(): void {
    this.classIdSubscription.unsubscribe();
  }
}
