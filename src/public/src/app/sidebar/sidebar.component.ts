import { Component, OnInit, Input } from '@angular/core';
import {
  AuthService,
  ILoginResult
} from '../modules/authentication/services/auth.service';
import { Router } from '@angular/router';
import { IRole } from '../modules/school-management/models/people/person.interface';
import { MenuService } from './menu.service';
import { flatten , filter , size } from 'lodash';

declare var $: any;
@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  @Input() currentUser: ILoginResult;

  constructor(
    private authService: AuthService,
    private router: Router,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.menuItems = this.getMenuItems(this.currentUser.roles);
      $.getScript('../../assets/js/sidebar-moving-tab.js');
    }
  }

  getMenuItems(roles: IRole[]) {
    let menuItems = [];
    roles.forEach(r => {
      let items: any[] = r.accessibility.map(a =>
        this.menuService.getMenuItems(a.title)
      );
      items = flatten(items);
      items = items.filter(i => i);
      menuItems = menuItems.concat(items);
    });
    return menuItems;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }
}
