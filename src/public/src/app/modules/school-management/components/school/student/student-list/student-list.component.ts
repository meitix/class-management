import { Component, OnInit } from '@angular/core';
import { IStudent } from 'src/app/modules/school-management/models/people/student.interface';
import { SchoolService } from '../../services/school.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/modules/base/services/error.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Array<IStudent>;
  schoolIdSubscription: Subscription;
  schoolId: string;

  constructor(private schoolService: SchoolService , private route: ActivatedRoute, private errorService: ErrorService) {
    this.students = [];
  }

   ngOnInit() {
   this.schoolIdSubscription = this.route.parent.params.subscribe(params => {
    if (params.id) {
      this.schoolId = params.id;
      this.fetchStudents(this.schoolId);
    }
   });
  }

  async fetchStudents(schoolId: string) {
    this.students = await this.schoolService.getStudents(schoolId).toPromise();
  }

  delete(studentId: string) {
    if (confirm('آیا برای حذف اطمینان دارید؟')) {
    this.schoolService.deleteStudent(this.schoolId , studentId).subscribe(res => {
      this.fetchStudents(this.schoolId);
      alert('قرآن آموز با موفقیت حذف شد.');
    },
    err => this.errorService.handle(err , 'عملیات با مشکل مواجه شد'));
    }
  }
}
