import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SchoolStartComponent } from '../school-start/school-start.component';
import { SchoolListComponent } from '../school-list/school-list.component';
import { SchoolCreateComponent } from '../school-create/school-create.component';
import { StudentStartComponent } from '../student/student-start/student-start.component';
import { StudentListComponent } from '../student/student-list/student-list.component';
import { StudentCreateComponent } from '../student/student-create/student-create.component';
import { PersonnelListComponent } from '../personnel/personnel-list/personnel-list.component';
import { PersonnelCreateComponent } from '../personnel/personnel-create/personnel-create.component';
import { GradesStartComponent } from '../grades/grades-start/grades-start.component';
import { GradesListComponent } from '../grades/grades-list/grades-list.component';
import { GradesCreateComponent } from '../grades/grades-create/grades-create.component';
import { ClassStartComponent } from '../class/class-start/class-start.component';
import { ClassListComponent } from '../class/class-list/class-list.component';
import { ClassCreateComponent } from '../class/class-create/class-create.component';
import { PeriodCreateComponent } from '../period/period-create/period-create.component';
const schoolRoutes: Routes = [
  {
    path: '',
    component: SchoolStartComponent,
    children: [
      { path: '', component: SchoolListComponent },
      { path: 'create', component: SchoolCreateComponent },
      { path: 'edit/:id', component: SchoolCreateComponent },
      { path: ':id/periods', component: PeriodCreateComponent},
      {
        // student routes.
        path: ':id/student',
        component: StudentStartComponent,
        children: [
          { path: '', component: StudentListComponent },
          { path: 'create', component: StudentCreateComponent },
          { path: 'edit/:id', component: StudentCreateComponent }
        ]
      },
      {
        // personnel routes.
        path: ':id/personnel',
        component: StudentStartComponent,
        children: [
          { path: '', component: PersonnelListComponent },
          { path: 'create', component: PersonnelCreateComponent },
          { path: 'edit/:id', component: PersonnelCreateComponent }
        ]
      },
      {
        // Grades routes.
        path: 'grades',
        component: GradesStartComponent,
        children: [
          { path: '', component: GradesListComponent },
          { path: 'create', component: GradesCreateComponent },
          { path: 'edit/:id', component: GradesCreateComponent }
        ]
      },
      {
        // Classes routes.
        path: ':id/classes',
        component: ClassStartComponent,
        children: [
          { path: '', component: ClassListComponent },
          { path: 'create', component: ClassCreateComponent },
          { path: 'edit/:id', component: ClassCreateComponent }
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
