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
  candidates: any[] = []; // Using 'any[]' to allow extra fields like userName/email
  isLoading = true;
  error: string = '';
  showProfileModal = false;
  selectedProfileSummary = '';
  userIsHR = true;

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
    this.http.get<any[]>(`http://localhost:5183/api/JobApplication/job/${this.jobId}/candidates`).subscribe(
      data => {
        this.candidates = data.sort((a, b) => b.jdMatchPercentage - a.jdMatchPercentage);
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

        const email = application.userEmail;
        const name = application.userName;
        if (email) {
          const subject = '📢 Update on Your Job Application';

          let body = '';
          switch (newStatus) {
            case 'Reviewed':
              body = `
                <p>Dear <strong>${name || 'Candidate'}</strong>,</p>
                <p>We wanted to let you know that we have <strong>reviewed</strong> your application for the position you applied for.</p>
                <p>Thank you for your interest and for taking the time to apply.</p>
                <p style="margin-top:20px;">Best regards,<br><strong>The HR Team</strong></p>
              `;
              break;
            case 'Interviewing':
              body = `
                <p>Dear <strong>${name || 'Candidate'}</strong>,</p>
                <p>Great news! You've been moved to the <strong>Interviewing</strong> stage.</p>
                <p>Our team will contact you soon with more details regarding the interview process.</p>
                <p>We look forward to getting to know you better!</p>
                <p style="margin-top:20px;">Warm wishes,<br><strong>The HR Team</strong></p>
              `;
              break;
            case 'Offered':
              body = `
                <p>Dear <strong>${name || 'Candidate'}</strong>,</p>
                <p>🎉 Congratulations! We are excited to offer you the position you applied for.</p>
                <p>Please log into your account to review and respond to your offer.</p>
                <p>We’re thrilled at the prospect of you joining our team.</p>
                <p style="margin-top:20px;">Cheers,<br><strong>The HR Team</strong></p>
              `;
              break;
            case 'Rejected':
              body = `
                <p>Dear <strong>${name || 'Candidate'}</strong>,</p>
                <p>Thank you for applying and for the time you invested in the process.</p>
                <p>After careful consideration, we regret to inform you that we will not be moving forward with your application.</p>
                <p>We wish you all the best in your job search and future opportunities.</p>
                <p style="margin-top:20px;">Sincerely,<br><strong>The HR Team</strong></p>
              `;
              break;
            default:
              body = `
                <p>Dear <strong>${name || 'Candidate'}</strong>,</p>
                <p>Your application status has been updated to: <strong>${newStatus}</strong>.</p>
                <p>Thank you for your interest in joining us.</p>
                <p style="margin-top:20px;">Best regards,<br><strong>The HR Team</strong></p>
              `;
          }

          this.http.post(`http://localhost:5183/api/User/send-email`, {
            to: email,
            subject: subject,
            body: body,
            isHtml: true  // Be sure your email API supports this flag and sends as HTML
          }).subscribe(
            () => {
              console.log('Email sent successfully to', email);
            },
            error => {
              console.error('Failed to send email:', error);
            }
          );
        }
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
