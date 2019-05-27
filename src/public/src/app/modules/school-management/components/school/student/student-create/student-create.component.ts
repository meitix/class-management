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
  student: IStudent;
  schoolIdSubscription: Subscription;

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
    this.schoolIdSubscription = this.route.parent.params.subscribe(params => {
      this.schoolId = params.id;
    });
  }

  async submit() {
    try {
      const res = await this.schoolService
        .addStudent(this.schoolId, this.student)
        .toPromise();
    } catch (e) {
      this.errorService.handle(e, 'مشکل در اتصال به سرور');
    }
  }

  updatePerson(student: IStudent) {
    if (student) {
      this.student = student;
      console.log(this.student);
    }
  }

  ngOnDestroy(): void {
    this.schoolIdSubscription.unsubscribe();
  }
}
