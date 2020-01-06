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
import { SchoolDashboardComponent } from '../school-dashboard/school-dashboard.component';
import { ManageStudentsComponent } from '../class/manage-students/manage-students.component';
import { ClassStatusComponent } from '../class/class-status/class-status.component';
import { StatisticsStartComponent } from '../class/statistics/statistics-start/statistics-start.component';
import { StatisticsListComponent } from '../class/statistics/statistics-list/statistics-list.component';
import { StatisticsCreateComponent } from '../class/statistics/statistics-create/statistics-create.component';

const schoolRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: SchoolListComponent, pathMatch: 'full' },
      { path: 'create', component: SchoolCreateComponent },
      { path: 'edit/:id', component: SchoolCreateComponent },
      { path: ':id/periods', component: PeriodCreateComponent },
      {
        // student routes.
        path: ':id/student',
        children: [
          { path: '', component: StudentListComponent },
          { path: 'create', component: StudentCreateComponent },
          { path: 'edit/:studentId', component: StudentCreateComponent }
        ]
      },
      {
        // personnel routes.
        path: ':id/personnel',
        children: [
          { path: '', component: PersonnelListComponent },
          { path: 'create', component: PersonnelCreateComponent },
          { path: 'edit/:personnelId', component: PersonnelCreateComponent }
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
        children: [
          { path: '', component: ClassListComponent },
          { path: 'create', component: ClassCreateComponent },
          { path: 'edit/:classId', component: ClassCreateComponent },
          { path: ':classId/students', component: ManageStudentsComponent },
          { path: ':classId/status', component: ClassStatusComponent },
          {
            path: ':classId/statistics',
            children: [
              { path: '', component: StatisticsListComponent },
              { path: 'create', component: StatisticsCreateComponent },
              { path: 'edit/:statusId', component: StatisticsCreateComponent }
            ]
          }
        ]
      },
      // go to school dashboard.
      { path: ':id', component: SchoolDashboardComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(schoolRoutes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule {}
