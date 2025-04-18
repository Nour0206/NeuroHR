import { Component, OnInit } from '@angular/core';

import { JobService } from 'src/app/services/job.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    ReactiveFormsModule
  ]
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  showModal = false;
  
  // Initialize the form group with default values and validators
  jobForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    location: ['', Validators.required]
  });

  constructor(
    private jobService: JobService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (data: Job[]) => this.jobs = data,
      error: (err) => console.error('Error loading jobs:', err)
    });
  }

  openAddJobModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.jobForm.reset();
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      this.jobService.createJob(this.jobForm.value).subscribe({
        next: () => {
          this.loadJobs();
          this.closeModal();
          // You could add a success toast/notification here
        },
        error: (err) => {
          console.error('Error creating job:', err);
          // You could show an error message to the user here
        }
      });
    }
  }

  deleteJob(id: number): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJob(id).subscribe({
        next: () => this.loadJobs(),
        error: (err) => console.error('Error deleting job:', err)
      });
    }
  }
}