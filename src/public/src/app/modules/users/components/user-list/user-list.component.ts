import { Component, OnInit } from '@angular/core';
import { UserService } from '../../sevices/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

users: User[];

  constructor(private userService: UserService) {
    this.users = [];
   }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      res => {
        this.users = res;
      }
    );
  }

}
