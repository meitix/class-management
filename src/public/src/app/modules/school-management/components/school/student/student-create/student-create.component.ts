import { Component, OnInit, OnDestroy } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import {
  IStudent,
  Student
} from 'src/app/modules/school-management/models/people/student.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/modules/base/services/error.service';
import {
  Person,
  IPerson
} from 'src/app/modules/school-management/models/people/person.interface';
import { FormValidatorService } from '../../../form-validator.service';
import validator from 'validator';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit, OnDestroy {
  isLoading: Boolean = false;
  schoolId: string;
  studentId: string;

  student: IStudent;
  schoolIdSubscription: Subscription;
  studentIdSubscription: Subscription;

  constructor(
    private schoolService: SchoolService,
    private route: ActivatedRoute,
    private errorService: ErrorService,
    private formValidatorService: FormValidatorService
  ) {
    this.student = new Student();
    this.student.parent = new Person();
    this.student.info = new Person();
  }

  ngOnInit() {
    // get school id from route.
    this.schoolIdSubscription = this.route.parent.params.subscribe(params => {
      this.schoolId = params.id;
    });
    // get student id from route.
    this.studentIdSubscription = this.route.params.subscribe(async params => {
      // didn't use parent on route object so in path '/student/:id' we need to read the id parameter.
      this.studentId = params.studentId;
      if (this.studentId) {
        await this.getStudent(this.studentId);
      }
    });
  }

  async getStudent(studentId: string) {
    this.isLoading = true;
    this.student = await this.schoolService.getStudent(studentId).toPromise();
    this.isLoading = false;
  }

  async submit() {
    const studentIsValid = this.formValidatorService.studentFormValidator(
      this.student.info.nationalCode,
      this.student.info.code,
      this.student.info.firstname,
      this.student.info.lastname,
      this.student.info.mobile,
      this.student.info.tel
    );
    if (!studentIsValid) return;

    const parentIsValid = this.formValidatorService.parentFormValidator(
      this.student.parent.nationalCode,
      this.student.parent.code,
      this.student.parent.firstname,
      this.student.parent.lastname,
      this.student.parent.mobile,
      this.student.parent.tel
    );
    if (!parentIsValid) return;
    this.student.period = this.schoolService.getSelectedPeriod();
    let req = this.schoolService.addStudent(this.schoolId, this.student);
    if (this.studentId) {
      req = this.schoolService.updateStudent(
        this.schoolId,
        this.studentId,
        this.student
      );
    }
    try {
      const res = await req.toPromise();

      alert('قرآن آموز با موفقیت ثبت شد');
    } catch (e) {
      if (e.error.code === 11000) {
        if (e.error.errmsg.includes('code')) {
          return this.errorService.handle(e, 'کد تکراری می باشد!');
        }
        if (e.error.errmsg.includes('nationalCode')) {
          return this.errorService.handle(e, 'کد ملی تکراری می باشد!');
        }
      } else {
        this.errorService.handle(e, 'مشکل در اتصال به سرور');
      }
    }
  }

  updateStudent(student: IPerson) {
    if (student) {
      this.student.info = student;
    }
  }

  updateParent(parent: Person) {
    this.student.parent = parent;
  }

  loadPersonByCode(code) {
    if (!this.studentId) {
      if (!code || code.length < 5 || !validator.isNumeric(code)) {
        // this.deleteFormIfPersonNotFound();
        // this.student.info.nationalCode = '';
        // this.student.parent.nationalCode = '';
        return;
      } else {
        this.schoolService.getStudentByCode(code).subscribe(res => {
          if (!res) {
            // this.deleteFormIfPersonNotFound();
            // this.student.info.nationalCode = '';
            // this.student.parent.nationalCode = '';
          } else {
            console.log(res.parent);
            this.student.info.nationalCode = res.student.nationalCode;
            if (res.parent) {
              this.student.parent.nationalCode = res.parent.nationalCode;
              this.student.parent.code = res.parent.code;
            }
            this.fillFormIfPersonIsFounded(res);
          }
        });
      }
    }
  }

  loadPersonByNationalCode(nationalCode) {
    if (!this.studentId) {
      const regex = /^\d{10}$/;
      const result = regex.exec(nationalCode);
      if (!nationalCode || !result) {
        // this.deleteFormIfPersonNotFound();
        // this.student.info.code = '';
        // this.student.parent.code = '';
        return;
      } else {
        this.schoolService.getStudentByCode(nationalCode).subscribe(res => {
          if (!res) {
            // this.student.info.code = '';
            // this.student.parent.code = '';
            // this.deleteFormIfPersonNotFound();
          } else {
            this.student.info.code = res.student.code;
            if (res.parent) {
              this.student.parent.nationalCode = res.parent.nationalCode;
              this.student.parent.code = res.parent.code;
            }
            this.fillFormIfPersonIsFounded(res);
          }
        });
      }
    }
  }

  deleteFormIfPersonNotFound() {
    this.student.info.firstname = '';
    this.student.info.lastname = '';
    this.student.info.mobile = [];
    this.student.info.tel = [];
    this.student.info.description = '';
    this.student.info.birthDate = '';

    this.student.parent.birthDate = '';
    this.student.parent.firstname = '';
    this.student.parent.lastname = '';
    this.student.parent.mobile = [];
    this.student.parent.tel = [];
    this.student.parent.description = '';
  }

  fillFormIfPersonIsFounded(res) {
    this.student.info.firstname = res.student.firstname;
    this.student.info.lastname = res.student.lastname;
    this.student.info.mobile = res.student.mobile;
    this.student.info.tel = res.student.tel;
    this.student.info.description = res.student.description;
    this.student.info.birthDate = moment(res.student.birthDate).format(
      'YYYY/MM/DD h:mm:ss'
    );
    this.student.info.birthDate = moment.from(
      this.student.info.birthDate,
      'en',
      'YYYY/MM/DD'
    );
    if (res.parent) {
      this.student.parent.firstname = res.parent.firstname;
      this.student.parent.lastname = res.parent.lastname;
      this.student.parent.mobile = res.parent.mobile;
      this.student.parent.tel = res.parent.tel;
      this.student.parent.description = res.parent.description;
      this.student.parent.birthDate = moment(res.parent.birthDate).format(
        'YYYY/MM/DD h:mm:ss'
      );
      this.student.parent.birthDate = moment.from(
        this.student.parent.birthDate,
        'en',
        'YYYY/MM/DD'
      );
    }
  }

  ngOnDestroy(): void {
    this.schoolIdSubscription.unsubscribe();
    this.studentIdSubscription.unsubscribe();
  }
}
