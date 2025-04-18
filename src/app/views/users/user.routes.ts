import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';

export const userRoutes: Routes = [
  { path: 'details', component: UserDetailsComponent },
  { path: '', component:  UserListComponent },

];
