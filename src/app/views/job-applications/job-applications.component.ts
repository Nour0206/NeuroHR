import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to delete this application?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.http.delete(`http://localhost:5183/api/JobApplication/${id}`).subscribe({
        next: () => {
          this.applications = this.applications.filter(app => app.id !== id);
          Swal.fire('Deleted!', 'Your application has been deleted.', 'success');
        },
        error: (err) => {
          console.error('Error deleting application:', err);
          Swal.fire('Error', 'Failed to delete application.', 'error');
        }
      });
    }
  });
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
