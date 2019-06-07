import { Routes } from '@angular/router';
import { GradesStartComponent } from '../grades/grades-start/grades-start.component';
import { GradesCreateComponent } from '../grades/grades-create/grades-create.component';
import { GradesListComponent } from '../grades/grades-list/grades-list.component';

export const GradesRoutes: Routes = [{
  path: 'grades' , component: GradesStartComponent , children: [
    {path: '', component: GradesListComponent},
    {path: 'create' , component: GradesCreateComponent},
    {path: 'edit/:id' , component: GradesCreateComponent}
  ]
}];
