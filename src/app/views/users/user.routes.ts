import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserAddComponent } from './user-add/user-add.component';

export const userRoutes: Routes = [
  { path: 'details', component: UserDetailsComponent },
  { path: 'add', component: UserAddComponent },
  { path: 'all', component:  UserListComponent },
  { path: 'update', component: UserUpdateComponent },
  
];
