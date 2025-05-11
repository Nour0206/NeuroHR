import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
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
    this.http.get('http://localhost:5183/api/JobApplication').subscribe(
      data => {
        this.applications = data as any[];
      },
      error => {
        console.error('Error fetching applications:', error);
      }
    );
  }
}
