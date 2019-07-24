import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/modules/base/services/error.service';
import { IPerson } from 'src/app/modules/school-management/models/people/person.interface';
import { IPersonnelViewModel } from 'src/app/modules/school-management/models/people/personnel.interface';

@Component({
  selector: 'app-personnel-list',
  templateUrl: './personnel-list.component.html',
  styleUrls: ['./personnel-list.component.css']
})
export class PersonnelListComponent implements OnInit {
  personnel: Array<IPerson>;
  schoolIdSubscription: Subscription;
  schoolId: string;
  data: Array<IPersonnelViewModel>;

  constructor(private schoolService: SchoolService , private route: ActivatedRoute, private errorService: ErrorService) {
    this.personnel = [];
  }

   ngOnInit() {
   this.schoolIdSubscription = this.route.parent.params.subscribe(params => {
    if (params.id) {
      this.schoolId = params.id;
      this.fetchPersonnel(this.schoolId);
    }
   });
  }

  // get personnel from student service.
  async fetchPersonnel(schoolId: string) {
    const data = await this.schoolService.getPersonnel(schoolId).toPromise();
    this.personnel = data.map(d => d.person);
  }

  // delete student.
  delete(personnel: IPerson) {
    if (confirm('آیا برای حذف اطمینان دارید؟')) {
    this.schoolService.deletePersonnel(this.schoolId , personnel._id).subscribe(res => {
      this.fetchPersonnel(this.schoolId);
      alert('فرد با موفقیت حذف شد.');
    },
    err => this.errorService.handle(err , 'عملیات با مشکل مواجه شد'));
    }
  }
}
