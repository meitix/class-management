import { Component, OnInit, Input } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { AuthService } from '../modules/authentication/services/auth.service';
import { User } from '../modules/users/models/user';

declare var $: any;
@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
 @Input() currentUser: User;
  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    // if (this.currentUser) {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
      $.getScript('../../assets/js/sidebar-moving-tab.js');
    // }
  }
}
