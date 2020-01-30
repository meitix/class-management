import { Component, OnInit, Input } from '@angular/core';
import {
  AuthService,
  ILoginResult
} from '../modules/authentication/services/auth.service';
import { Router } from '@angular/router';
import { MenuService } from './menu.service';
import { flatten } from 'lodash';

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

  async ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.menuItems = await this.getMenuItems(this.currentUser);
      $.getScript('../../assets/js/sidebar-moving-tab.js');
    }
  }

  async getMenuItems(loginResult: ILoginResult) {
    let menuItems = [];
    let items: any[] = [];

    let hasAdmin = loginResult.roles.find(r => {
      if (r.title === 'ادمین') {
        return true;
      }
    });
    await loginResult.roles.forEach(r => {
      if (hasAdmin) {
        items = this.menuService.getMenuItems('manage-school');
      } else {
        let item = r.accessibility.map(a =>
          this.menuService.getMenuItems(a.title)
        );
        items.push(item);
      }
    });

    items = flatten(flatten(items));
    items = items.filter(i => i);
    menuItems = menuItems.concat(items);
    menuItems = this.getUniqueItems(menuItems);

    return menuItems;
  }

  getUniqueItems(array) {
    let unique = array.filter(
      (set => f => !set.has(f.title) && set.add(f.title))(new Set())
    );
    return unique;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }
}
