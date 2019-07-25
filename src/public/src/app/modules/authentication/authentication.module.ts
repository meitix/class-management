import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing/auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AuthStartComponent } from './components/auth-start/auth-start.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../users/sevices/user.service';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],
  declarations: [LoginComponent, AuthStartComponent],
  providers: [UserService , AuthService]
})
export class AuthenticationModule { }
