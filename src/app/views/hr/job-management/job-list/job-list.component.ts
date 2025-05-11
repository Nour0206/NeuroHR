import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../../services/job.service';
import { Job } from '../../../../models/job';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  showCard: { [key: number]: boolean } = {};
  selectedFile: File | null = null;
  form: FormGroup;

  constructor(
    private jobService: JobService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({ resume: null });
  }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (data) => (this.jobs = data),
      error: (err) => console.error('Error fetching jobs:', err)
    });
  }

  toggleCard(jobId: number) {
    this.showCard[jobId] = !this.showCard[jobId];
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  apply(jobId: number) {
    if (!this.selectedFile) return;

    this.jobService.getJobById(jobId).subscribe((jobDetails) => {
      const pythonFormData = new FormData();
      pythonFormData.append('resume', this.selectedFile!);
      pythonFormData.append('jobDetails', JSON.stringify(jobDetails));

      this.http.post<any>('http://localhost:5000/evaluate', pythonFormData).subscribe((result) => {
        const formData = new FormData();

        formData.append('resume', this.selectedFile!, this.selectedFile!.name);
        formData.append('jobPostingId', jobId.toString());
        formData.append('status', 'Pending');
        formData.append('JDMatchPercentage', result.JDMatchPercentage?.toString() ?? '0');


        // Ensure required fields are present
        const missingKeywords = result.MissingKeywords?.toString().trim() || 'N/A';
        const matchingKeywords = Array.isArray(result.MatchingKeywords)
          ? result.MatchingKeywords.join(', ')
          : (result.MatchingKeywords?.toString().trim() || 'N/A');
        const profileSummary = result.ProfileSummary?.toString().trim() || 'N/A';
        formData.append('missingKeywords', missingKeywords);
        formData.append('matchingKeywords', matchingKeywords);
        formData.append('profileSummary', profileSummary);
        const JobMatch = result.JDMatchPercentage?.toString();
        // Optional field if needed
        formData.append('resumeUrl', '');

        console.log('Final form fields:', { jobId, matchingKeywords,JobMatch ,missingKeywords, profileSummary });

        this.http.post('http://localhost:5183/api/JobApplication', formData).subscribe({
          next: () => alert('Application submitted successfully!'),
          error: (err) => {
            console.error('Error submitting application:', err);
            if (err.error && err.error.errors) {
              console.error('Validation Errors:', err.error.errors);
            }
          }
        });
      });
    });
  }


}
