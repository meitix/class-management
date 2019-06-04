import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  errorMessage: string;

  @ViewChild('f') form: NgForm;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log(this.authService.getCurrentUser());
  }

  submit() {
    if (this.form.valid) {
      this.authService.register(this.username, this.password).subscribe((res: any) => {
        if (res.success) {
          this.router.navigate(['..', 'login'], { relativeTo: this.route });
        } else {
          this.errorMessage = res.error.errmsg;
        }
      });
    } else {
      this.errorMessage = 'لطفا موارد خواسته شده را پر کنید';
    }
  }
}
