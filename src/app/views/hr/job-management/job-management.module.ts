import { RouterModule } from '@angular/router';
import { jobManagementRoutes } from './job-management.routes';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JobListComponent } from './job-list/job-list.component';
import { JobAddComponent } from './job-add/job-add.component';
import { JobUpdateComponent } from './job-update/job-update.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    JobAddComponent,
    JobUpdateComponent,
    JobDetailsComponent
  ],
  imports: [
    JobListComponent,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule ,
    RouterModule.forChild(jobManagementRoutes)
  ]
})
export class JobManagementModule { }
