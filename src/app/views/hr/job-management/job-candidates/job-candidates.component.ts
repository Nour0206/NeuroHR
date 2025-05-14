import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ApplicationStatus, JobApplication } from '../../../../models/job-application';
import { TruncatePipe } from '../../../../pipes/truncate.pipe';


@Component({
  selector: 'app-job-candidates',
  templateUrl: './job-candidates.component.html',
  styleUrls: ['./job-candidates.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ToastrModule, TruncatePipe]
})
export class JobCandidatesComponent implements OnInit {
  jobId: number;
  candidates: JobApplication[] = [];
  isLoading = true;
  error: string = '';
  showProfileModal = false;
  selectedProfileSummary = '';
  userIsHR = true; // This should be set based on actual user role

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.jobId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.fetchCandidates();
  }

  fetchCandidates(): void {
    this.isLoading = true;
    this.http.get<JobApplication[]>(`http://localhost:5183/api/JobApplication/job/${this.jobId}/candidates`).subscribe(
      data => {
        this.candidates = data.sort((a, b) => b.jdMatchPercentage! - a.jdMatchPercentage!);
        this.fetchUserNames();
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching candidates:', error);
        this.error = 'Failed to fetch candidates. Please try again later.';
        this.isLoading = false;
        this.toastr.error('Failed to fetch candidates', 'Error');
      }
    );
  }

  fetchUserNames(): void {
    this.candidates.forEach(candidate => {
      this.http.get<{ name: string }>(`http://localhost:5183/api/User/${candidate['userId']}/name`).subscribe(
        data => {
          candidate['userName'] = data.name; // Dynamically add userName to the candidate
        },
        error => {
          console.error(`Error fetching user name for userId ${candidate['userId']}:`, error);
        }
      );
    });
  }

  updateStatus(applicationId: number, newStatus: string): void {
    if (!this.userIsHR) {
      this.toastr.error('You do not have permission to perform this action.', 'Access Denied');
      return;
    }
    this.http.patch(`http://localhost:5183/api/JobApplication/${applicationId}/status`, { status: newStatus }).subscribe(
      () => {
        const application = this.candidates.find(app => app.id === applicationId);
        if (application) {
          application.status = newStatus as ApplicationStatus;
          this.toastr.success('Status updated successfully!', 'Success');
        }
      },
      error => {
        console.error('Error updating status:', error);
        this.toastr.error('Failed to update status', 'Error');
      }
    );
  }

  openProfileModal(summary: string): void {
    this.selectedProfileSummary = summary;
    this.showProfileModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeProfileModal(): void {
    this.showProfileModal = false;
    document.body.style.overflow = '';
    setTimeout(() => {
      this.selectedProfileSummary = '';
    }, 300);
  }
}
