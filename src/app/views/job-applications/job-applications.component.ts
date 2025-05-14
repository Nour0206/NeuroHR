import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.scss'],
  standalone: true,
  imports: [ CommonModule ]
})
export class ApplicationListComponent implements OnInit {
  applications: any[] = [];
  isLoading = true;
  error: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchApplications();
  }
  deleteApplication(id: number): void {
    if (confirm('Are you sure you want to delete this application?')) {
      this.http.delete(`http://localhost:5183/api/JobApplication/${id}`).subscribe({
        next: () => {
          this.applications = this.applications.filter(app => app.id !== id);
          console.log('Application deleted');
        },
        error: (err) => {
          console.error('Error deleting application:', err);
        }
      });
    }
  }

  fetchApplications() {
    this.isLoading = true; // Show loading indicator
    this.http.get<any[]>('http://localhost:5183/api/JobApplication').subscribe(
      data => {
        this.applications = data.map(app => ({
          ...app,
          appliedOn: new Date(app.appliedOn) // Ensure appliedOn is a Date object
        }));
        this.isLoading = false; // Hide loading indicator
      },
      error => {
        console.error('Error fetching applications:', error);
        this.error = 'Failed to fetch applications. Please try again later.';
        this.isLoading = false; // Hide loading indicator
      }
    );
  }
}
