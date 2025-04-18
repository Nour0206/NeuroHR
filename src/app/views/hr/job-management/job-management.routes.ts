import { Routes } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { JobAddComponent } from './job-add/job-add.component';
import { JobUpdateComponent } from './job-update/job-update.component';
import { JobDetailsComponent } from './job-details/job-details.component'; // <-- Make sure path is correct

export const jobManagementRoutes: Routes = [
  {
    path: '',
    component: JobListComponent,
  },
  {
    path: 'add',
    component: JobAddComponent,
  },
  {
    path: 'update/:id',
    component: JobUpdateComponent,
  },
  {
    path: 'details/:id',
    component: JobDetailsComponent,
  }
];
