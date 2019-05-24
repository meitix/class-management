import { Component, OnInit, ViewChild } from '@angular/core';
import { ISchool, School } from '../models/edu/school.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-school-create',
  templateUrl: './school-create.component.html',
  styleUrls: ['./school-create.component.css']
})
export class SchoolCreateComponent implements OnInit {

  school: ISchool;

  @ViewChild('f') form: NgForm;

  constructor() {
    this.school = new School();
  }

  ngOnInit() {
  }

  submit(f: NgForm) {
    if (f.valid) {
      this.formService.create(f.value.username , f.value.password).subscribe(
        res => {
          if (res.success) {
            alert('کاربر ' + this.user.username + ' با موفقیت ثبت شد');
          }else {
            alert(res.message);
            console.log(res.error);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
