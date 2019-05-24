import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SchoolStartComponent } from '../school-start/school-start.component';
import { SchoolListComponent } from '../school-list/school-list.component';
import { SchoolCreateComponent } from '../school-create/school-create.component';



const schoolRoutes: Routes = [
  {path: '' , component: SchoolStartComponent , children: [
    {path: '' , component: SchoolListComponent},
    {path: 'create' , component: SchoolCreateComponent},
    {path: 'edit/:id' , component: SchoolCreateComponent}
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(schoolRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SchoolRoutingModule { }
