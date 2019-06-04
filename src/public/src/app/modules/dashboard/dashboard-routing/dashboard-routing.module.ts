import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';

const dashRoutes: Routes = [
  {path: '' , component: HomeComponent}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dashRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class DashboardRoutingModule { }
