import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes } from '@angular/router';
import { AuthStartComponent } from '../components/auth-start/auth-start.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';

const routes: Routes = [
  {path: '' , component: AuthStartComponent , children: [
    {path: '', pathMatch: 'full' , component: LoginComponent},
    {path: 'login' , component: LoginComponent},
    {path: 'register' , component: RegisterComponent}
  ]}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AuthRoutingModule { }
