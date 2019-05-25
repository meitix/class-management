import { Component, OnInit , ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../sevices/user.service';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent implements OnInit , OnDestroy {
  passwordType: string;
  passwordBtnText: string;
  user: User;
  userRoles: string[];
  idSubscription: Subscription;

@ViewChild('f') form: NgForm;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.user = new User();
    this.passwordType = 'password';
    this.passwordBtnText = 'نمایش کلمه عبور';
  }

  ngOnInit() {
   this.idSubscription = this.route.params.subscribe(
      params => {
        const id = params['id'];
        this.userService.getUserById(id).subscribe(
          user => {
            this.user = user;
          }
        );
      }
    );
    this.userRoles = this.userService.getRoles();
  }

  toggleShowPassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordBtnText =
      this.passwordType === 'password'
        ? 'نمایش کلمه عبور'
        : 'عدم نمایش کلمه عبور';
  }

  submit(f: NgForm) {
    if (f.valid) {
      this.userService.create(f.value.username , f.value.password).subscribe(
        res => {
          if (res.success) {
            alert('کاربر ' + this.user.username + ' با موفقیت ثبت شد');
          } else {
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

  isInRole(): boolean {
    return false;
  }

  onRoleChange(r: HTMLInputElement , role: string) {
    console.log(role , r.checked);
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }

}
