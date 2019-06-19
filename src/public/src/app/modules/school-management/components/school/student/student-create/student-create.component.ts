import { Component, OnInit, OnDestroy } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import {
  IStudent,
  Student
} from 'src/app/modules/school-management/models/people/student.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/modules/base/services/error.service';
import { Parent } from 'src/app/modules/school-management/models/people/parent.interface';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit, OnDestroy {
  schoolId: string;
  studentId: string;

  student: IStudent;
  schoolIdSubscription: Subscription;
  studentIdSubscription: Subscription;

  constructor(
    private schoolService: SchoolService,
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {
    this.student = new Student();
    this.student.parent = new Parent();
    console.log(this.student);
  }

  ngOnInit() {
    // get school id from route.
    this.schoolIdSubscription = this.route.parent.params.subscribe(params => {
      this.schoolId = params.id;
    });
    // get student id from route.
    this.studentIdSubscription = this.route.params.subscribe(params => {
    // didn't use parent on route object so in path '/student/:id' we need to read the id parameter.
      this.studentId = params.id;
      if (this.studentId) {
        this.getStudent(this.studentId);
      }
    });
  }

  async getStudent(studentId: string) {
    this.student = await this.schoolService.getStudent(studentId).toPromise();
  }

  async submit() {
    let req = this.schoolService.addStudent(this.schoolId, this.student);
    if (this.studentId) {
      req = this.schoolService.updateStudent(this.schoolId , this.studentId , this.student);
    }
    try {
      const res = await req.toPromise();

        alert('قرآن آموز با موفقیت ثبت شد');
    } catch (e) {
      this.errorService.handle(e, 'مشکل در اتصال به سرور');
    }
  }

  updateStudent(student: IStudent) {
    if (student) {
      this.student.info = student;
    }
  }

  updateParent(parent: Parent) {
    this.student.parent = parent;
  }

  ngOnDestroy(): void {
    this.schoolIdSubscription.unsubscribe();
    this.studentIdSubscription.unsubscribe();
  }
}
