import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Job } from '../../../../models/job';
import { AuthService } from '../../../../services/auth.service';
import { JobService } from '../../../../services/job.service';
import { ToastrService } from 'ngx-toastr'; // ✅ Import Toastr
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  selectedDomaine: string = '';
  selectedContractType: string = '';
  userRole: string = '';
  showCard: { [key: number]: boolean } = {};
  selectedFile: File | null = null;
  form: FormGroup;
  appliedJobIds: number[] = [];
  userIsHR: boolean = false;

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

  constructor(
    private jobService: JobService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService // ✅ Inject Toastr
  ) {
    this.form = this.fb.group({ resume: null });
  }

  ngOnInit(): void {
    this.loadJobs();
    this.loadAppliedJobs();

    const userInfo = this.authService.getUserInfo();
    if (userInfo && userInfo.roles) {
      this.userRole = userInfo.roles.includes('HR') ? 'HR' : 'User';
    }

    this.userIsHR = this.isHR();
  }

  toggleDetails(job: any) {
    job.showDetails = !job.showDetails;
  }

  loadJobs(): void {
    this.jobService.getJobs(this.selectedDomaine, this.selectedContractType).subscribe({
      next: (data) => (this.jobs = data),
      error: (err) => {
        console.error('Error fetching jobs:', err);
        this.toastr.error('Failed to load jobs. Please try again.', 'Error ❌');
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
        this.toastr.error('Failed to load applied jobs.', 'Error ❌');
      }
    });
  }

  isJobApplied(jobId: number): boolean {
    return this.appliedJobIds.includes(jobId);
  }

  toggleCard(jobId: number): void {
    this.showCard[jobId] = !this.showCard[jobId];
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  apply(jobId: number): void {
    if (!this.selectedFile) {
      this.toastr.warning('Please upload your resume before applying.', 'Warning ⚠️');
      return;
    }

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
            this.toastr.success('Application submitted successfully!', 'Success ✅');
            this.selectedFile = null;
            this.showCard[jobId] = false;
            this.loadJobs();
          },
          error: (err) => {
            console.error('Error submitting application:', err);
            this.toastr.error('Failed to submit application. Please try again.', 'Error ❌');
          }
        });
      });
    });
  }

  onDelete(id: number): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This action will permanently delete the job.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
  }).then((result) => {
    if (result.isConfirmed) {
      this.jobService.deleteJob(id).subscribe({
        next: () => {
          this.toastr.success('Job deleted successfully.', 'Deleted ✅');
          this.loadJobs();
        },
        error: (err) => {
          console.error('Error deleting job:', err);
          this.toastr.error('Failed to delete job.', 'Error ❌');
        }
      });
    }
  });
}

  isHR(): boolean {
    return this.userRole === 'HR';
  }
}
