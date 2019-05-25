import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes , RouterModule} from '@angular/router';
import { UserListComponent } from '../components/user-list/user-list.component';
import { UserCreateComponent } from '../components/user-create/user-create.component';
import { UserStartComponent } from '../components/user-start/user-start.component';


const userRoutes: Routes = [
    {path: '' , component: UserStartComponent , children: [
      {path: '' , component: UserListComponent},
      {path: 'create' , component: UserCreateComponent},
      {path: 'edit/:id' , component: UserCreateComponent}
    ]}
];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class UserRoutingModule { }
