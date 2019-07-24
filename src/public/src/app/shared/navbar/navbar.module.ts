import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { SchoolManagementModule } from 'src/app/modules/school-management/school.module';

@NgModule({
    imports: [ RouterModule, CommonModule , SchoolManagementModule],
    declarations: [ NavbarComponent ],
    exports: [ NavbarComponent ]
})

export class NavbarModule {}
