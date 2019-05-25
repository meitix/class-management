import { Component, OnInit, ViewChild } from '@angular/core';
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
export class SchoolCreateComponent implements OnInit {
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
      this.schoolService.create(this.school).subscribe(
        res => {
          alert(this.school.code + ` با موفقیت ثبت شد`);
        },
        err => {
          this.errorService.handle(err, 'خطا.');
        }
      );
    }
  }
}
