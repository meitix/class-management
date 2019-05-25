import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {path: 'users' , loadChildren: '../modules/users/users.module#UsersModule' },
  {path: 'school' , loadChildren: '../modules/school-management/school.module#SchoolManagementModule' },
  {path: 'authentication' , loadChildren: '../modules/authentication/authentication.module#AuthenticationModule'},
  {path: '' , loadChildren: '../modules/dashboard/dashboard.module#DashboardModule' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
