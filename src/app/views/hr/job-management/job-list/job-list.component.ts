import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Job } from '../../../../models/job';
import { AuthService } from '../../../../services/auth.service';
import { JobService } from '../../../../services/job.service';
@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule]
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  selectedDomaine: string = '';
  selectedContractType: string = '';
  userRole: string = '';
  showCard: { [key: number]: boolean } = {};
  selectedFile: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  form: FormGroup;
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

  appliedJobIds: number[] = [];
  userIsHR: boolean = false; // Add a variable to store the result of isHR()

  constructor(private jobService: JobService,private http: HttpClient,private route: ActivatedRoute,private fb: FormBuilder, private authService: AuthService) {this.form = this.fb.group({ resume: null });}

  ngOnInit(): void {
    this.loadJobs();
    this.loadAppliedJobs(); // Load applied jobs for the user
    const userInfo = this.authService.getUserInfo();
    console.log('User Info:', userInfo); // Debugging log
    if (userInfo && userInfo.roles) {
        console.log('User Roles:', userInfo.roles); // Debugging log
        this.userRole = userInfo.roles.includes('HR') ? 'HR' : 'User';
    }
    console.log('User Role:', this.userRole); // Debugging log

    this.userIsHR = this.isHR(); // Store the result of isHR()
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
    loadAppliedJobs(): void {
      this.http.get<number[]>('http://localhost:5183/api/JobApplication/user/applied-jobs').subscribe({
        next: (data) => {
          this.appliedJobIds = data;
        },
        error: (err) => {
          console.error('Error fetching applied jobs:', err);
        }
      });
    }
    isJobApplied(jobId: number): boolean {
      return this.appliedJobIds.includes(jobId);
    }
    toggleCard(jobId: number) {
      this.showCard[jobId] = !this.showCard[jobId];
      console.log('showCard state:', this.showCard);
    }
    onFileChange(event: any):void {
      if (event.target.files.length > 0) {
        this.selectedFile = event.target.files[0];
      }
    }

    apply(jobId: number): void {
      if (!this.selectedFile) return;

      this.jobService.getJobById(jobId.toString()).subscribe((jobDetails) => {
        const pythonFormData = new FormData();
        pythonFormData.append('resume', this.selectedFile!);
        pythonFormData.append('jobDetails', JSON.stringify(jobDetails));

        this.http.post<any>('http://localhost:5000/evaluate', pythonFormData).subscribe((result) => {
          const formData = new FormData();

          formData.append('resume', this.selectedFile!, this.selectedFile!.name);
          formData.append('jobPostingId', jobId.toString());
          formData.append('status', 'Pending');
          formData.append('JDMatchPercentage', result.JDMatchPercentage?.toString() ?? '0');

          const missingKeywords = result.MissingKeywords?.toString().trim() || 'N/A';
          const matchingKeywords = Array.isArray(result.MatchingKeywords)
            ? result.MatchingKeywords.join(', ')
            : (result.MatchingKeywords?.toString().trim() || 'N/A');
          const profileSummary = result.ProfileSummary?.toString().trim() || 'N/A';
          formData.append('missingKeywords', missingKeywords);
          formData.append('matchingKeywords', matchingKeywords);
          formData.append('profileSummary', profileSummary);

          this.http.post('http://localhost:5183/api/JobApplication', formData).subscribe({
            next: () => {
              this.successMessage = 'Application submitted successfully!';
              this.errorMessage = '';
              this.selectedFile = null;
              this.showCard[jobId] = false;
              this.loadJobs();
            },
            error: (err) => {
              console.error('Error submitting application:', err);
              this.errorMessage = 'Failed to submit application. Please try again.';
              this.successMessage = '';
            }
          });
        });
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

    isHR(): boolean {
      return this.userRole === 'HR';
    }




}
