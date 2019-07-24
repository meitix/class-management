import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../modules/authentication/services/auth.guard';

const appRoutes: Routes = [
  {path: 'auth' , loadChildren: '../modules/authentication/authentication.module#AuthenticationModule' },
  {path: 'users' , canActivate: [AuthGuard], loadChildren: '../modules/users/users.module#UsersModule' },
  {path: 'school' , canActivate: [AuthGuard], loadChildren: '../modules/school-management/school.module#SchoolManagementModule' },
  {path: '' , canActivate: [AuthGuard], loadChildren: '../modules/dashboard/dashboard.module#DashboardModule' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
