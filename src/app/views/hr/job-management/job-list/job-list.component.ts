import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../../services/job.service';
import { Job } from '../../../../models/job';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class JobListComponent{
  
  jobs: Job[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }
  // Add to your component class
toggleDetails(job: any) {
  job.showDetails = !job.showDetails;
}
  loadJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (data) => this.jobs = data,
      error: (err) => console.error('Error fetching jobs:', err)
    });
  }

  
    
}
