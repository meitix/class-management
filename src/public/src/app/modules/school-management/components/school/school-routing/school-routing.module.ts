import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SchoolStartComponent } from '../school-start/school-start.component';
import { SchoolListComponent } from '../school-list/school-list.component';
import { SchoolCreateComponent } from '../school-create/school-create.component';
import { StudentStartComponent } from '../student/student-start/student-start.component';
import { StudentListComponent } from '../student/student-list/student-list.component';
import { StudentCreateComponent } from '../student/student-create/student-create.component';

const schoolRoutes: Routes = [
  {
    path: '',
    component: SchoolStartComponent,
    children: [
      { path: '', component: SchoolListComponent },
      { path: 'create', component: SchoolCreateComponent },
      { path: 'edit/:id', component: SchoolCreateComponent },
      {
        path: ':id/student',
        component: StudentStartComponent,
        children: [
          { path: '', component: StudentListComponent },
          { path: 'create', component: StudentCreateComponent },
          { path: 'edit/:id', component: StudentCreateComponent }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(schoolRoutes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule {}
