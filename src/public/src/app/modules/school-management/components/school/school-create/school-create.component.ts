import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ISchool, School } from '../../../models/edu/school.interface';
import { NgForm } from '@angular/forms';
import { SchoolService } from '../services/school.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/modules/base/services/error.service';

@Component({
  selector: 'app-school-create',
  templateUrl: './school-create.component.html',
  styleUrls: ['./school-create.component.css']
})
export class SchoolCreateComponent implements OnInit , OnDestroy {
  school: ISchool;
  routeSubscription: Subscription;
  @ViewChild('f') form: NgForm;

  constructor(
    private schoolService: SchoolService,
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {
    this.school = new School();
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(async params => {
      if (params.id) {
        // fetch school data.
        try {
          this.school = await this.schoolService.fetchById(params.id).toPromise();
        } catch (e) {
          this.errorService.handle(e , 'مشکل در بارگزاری اطلاعات');
        }
      }
    });
  }

  submit(f: NgForm) {
    if (f.valid) {
      let request = this.schoolService.create(this.school);

      // change request to update if user is updating.
      if (this.school._id) {
        request = this.schoolService.update(this.school._id , this.school);
      }

      request.subscribe(res => {
        this.school = res;
        alert(this.school.code + ` با موفقیت ثبت شد`); },
        err => this.errorService.handle(err, 'خطا.'));
    }
  }

  ngOnDestroy(): void {
   this.routeSubscription.unsubscribe();
  }
}
