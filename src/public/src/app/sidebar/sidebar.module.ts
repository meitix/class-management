import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { MenuService } from './menu.service';
import { AuthService } from '../modules/authentication/services/auth.service';

@NgModule({
    imports: [ RouterModule, CommonModule],
    declarations: [ SidebarComponent ],
    providers: [MenuService, AuthService],
    exports: [ SidebarComponent ]
})

export class SidebarModule {}
