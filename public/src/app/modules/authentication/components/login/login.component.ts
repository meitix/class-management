import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../../../users/models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  username: string;
  password: string;
  remember: boolean;

  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.getRememberedUser();
    if (user) {
      this.username = user.username;
      this.password = user.password;
      this.submit();
    }
  }

  submit() {
    if (this.form.valid) {
      this.authService.login(this.username, this.password).subscribe(res => {

        // check user is exists.
        if (res) {

          // make user remember.
          if (this.remember) {
           this.authService.makeUserRemembered(res);
          }

          // check user status.
          if (res.active) {
            // make user logged in.
            this.authService.setCurrentUser(res);
            // navigate to dashboard.
            this.router.navigate(['']);
          } else {
            this.errorMessage = 'شما اجازه استفاده از سیستم را ندارید';
          }

        } else {
          this.errorMessage = 'نام کاربری یا کلمه عبور اشتباه است';
        }
      });
    } else {
      this.errorMessage = 'لطفا موارد خواسته شده را کامل کنید';
    }
  }
}
