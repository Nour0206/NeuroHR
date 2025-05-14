import { Routes } from '@angular/router';
import { JobAddComponent } from './job-add/job-add.component';
import { JobDetailsComponent } from './job-details/job-details.component'; // <-- Make sure path is correct
import { JobListComponent } from './job-list/job-list.component';
import { JobUpdateComponent } from './job-update/job-update.component';

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
  },
  {
    path: ':id/candidates',
    loadComponent: () => import('./job-candidates/job-candidates.component').then(m => m.JobCandidatesComponent),
    data: {
      title: 'Job Candidates'
    }
  }
];
