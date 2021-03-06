import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { catchError, tap } from 'rxjs/operators';

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

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    if (this.form.valid) {
      this.isLoading = true;
      this.authService
        .login(this.username, this.password)
        .pipe(tap(() => (this.isLoading = false)))
        .subscribe(
          res => {
            // check user is exists.
            if (res) {
              // make user remember.
              if (this.remember) {
                this.authService.makeUserRemembered(res);
              }

              // make user logged in.
              this.authService.setCurrentUser(res);

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
