import { Component, OnInit, OnDestroy } from '@angular/core';
import { IStudent } from 'src/app/modules/school-management/models/people/student.interface';
import { SchoolService } from '../../services/school.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/modules/base/services/error.service';
import { IPerson } from 'src/app/modules/school-management/models/people/person.interface';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {
  students: Array<IPerson>;
  schoolIdSubscription: Subscription;
  schoolId: string;
  periodChangeSubscription: Subscription;
  isLoading: boolean = true;

  constructor(
    private schoolService: SchoolService,
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {
    this.students = [];
  }

  ngOnInit() {
    this.schoolIdSubscription = this.route.parent.params.subscribe(params => {
      if (params.id) {
        this.schoolId = params.id;
        this.fetchStudents(this.schoolId);
      }
    });

    // period change subscription.
    this.periodChangeSubscription = this.schoolService.periodSelected.subscribe(
      () => this.fetchStudents(this.schoolId)
    );
  }

  // get students from student service.
  async fetchStudents(schoolId: string) {
    const students = await this.schoolService.getStudents(schoolId).toPromise();
    this.students = students.map(s => {
      s.info._id = s._id;
      return s.info;
    });
    this.isLoading = false;
  }

  // delete student.
  delete(student: IStudent) {
    if (confirm('آیا برای حذف اطمینان دارید؟')) {
      this.schoolService.deleteStudent(this.schoolId, student._id).subscribe(
        res => {
          this.fetchStudents(this.schoolId);
          alert('قرآن آموز با موفقیت حذف شد.');
        },
        err => this.errorService.handle(err, 'عملیات با مشکل مواجه شد')
      );
    }
  }

  ngOnDestroy() {
    this.schoolIdSubscription.unsubscribe();
    this.periodChangeSubscription.unsubscribe();
  }
}
