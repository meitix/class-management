import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolListComponent } from './components/school/school-list/school-list.component';
import { SchoolCreateComponent } from './components/school/school-create/school-create.component';
import { SchoolStartComponent } from './components/school/school-start/school-start.component';
import { SchoolRoutingModule } from './components/school/school-routing/school-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActiveStatusPipe } from '../users/pipes/active-status.pipe';
import { PersonelComponent } from './components/personel/personel.component';

@NgModule({
  declarations: [SchoolListComponent, SchoolCreateComponent, SchoolStartComponent, ActiveStatusPipe, PersonelComponent],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ActiveStatusPipe]
})
export class SchoolManagementModule { }
