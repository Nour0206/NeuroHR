import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../../services/job.service';
import { Job } from '../../../../models/job';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule, RouterModule]
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  selectedDomaine: string = '';
  selectedContractType: string = '';
  userRole: string = '';

  domaines = [
    { value: 'Security', label: 'Security' },
    { value: 'Data', label: 'Data' },
    { value: 'Cloud', label: 'Cloud' },
    { value: 'Network', label: 'Network' },
    { value: 'AI', label: 'AI' },
    { value: 'Web', label: 'Web' },
    { value: 'Mobile', label: 'Mobile' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Other', label: 'Other' }
  ];

  contractTypes = [
    { value: 'Permanent', label: 'Permanent' },
    { value: 'Temporary', label: 'Temporary' },
    { value: 'Internship', label: 'Internship' }
  ];



  constructor(private jobService: JobService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadJobs();
    // this.userRole = this.authService.getUserRole();
  }
  // Add to your component class
toggleDetails(job: any) {
  job.showDetails = !job.showDetails;
}
   /* loadJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (data) => (this.jobs = data),
      error: (err) => console.error('Error fetching jobs:', err)
    }); */


    loadJobs(): void {
      this.jobService.getJobs(this.selectedDomaine, this.selectedContractType).subscribe({
        next: (data) => {
          this.jobs = data;
        },
        error: (err) => {
          console.error('Error fetching jobs:', err);
        }
      });
    }


    /*  onEdit(id: number): void {
    this.router.navigate(['/job/update', id]);
  } */


     onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce job ?')) {
      this.jobService.deleteJob(id).subscribe(() => {
        this.loadJobs(); // Recharge la liste
      });
    }}




}
