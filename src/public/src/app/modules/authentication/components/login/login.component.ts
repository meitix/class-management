import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { SchoolService } from 'src/app/modules/school-management/components/school/services/school.service';
import { PersonService } from 'src/app/modules/school-management/components/person/services/person.service';
import { GradeService } from 'src/app/modules/school-management/components/school/grades/services/grade.service';
import { ClassService } from 'src/app/modules/school-management/components/school/class/services/class.service';
import { UserService } from 'src/app/modules/users/sevices/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('f') form: NgForm;

  username: string;
  password: string;
  remember: boolean;
  isLoading: boolean;

  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private schoolService: SchoolService,
    private personService: PersonService,
    private gardeService: GradeService,
    private classService: ClassService
  ) {}

  submit() {
    if (this.form.valid) {
      this.isLoading = true;
      this.authService.login(this.username, this.password).subscribe(
        res => {
          // check user is exists.
          if (res) {
            // make user remember.
            if (this.remember) {
              this.authService.makeUserRemembered(res);
            }

            // make user logged in.
            this.authService.setCurrentUser(res);
            this.schoolService.appenAuthToken();
            this.gardeService.appenAuthToken();
            this.personService.appenAuthToken();
            this.classService.appenAuthToken();

            if (res.schoolId) {
              // create redirect url based on user role.
              this.router.navigate(['school', res.schoolId]);
            } else {
              // navigate to dashboard.
              this.router.navigate(['']);
            }
          } else {
            this.errorMessage = 'نام کاربری یا کلمه عبور اشتباه است';
          }
        },
        e => {
          this.errorMessage = e.error;
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage = 'لطفا موارد خواسته شده را کامل کنید';
    }
  }
}
