import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JobApplication } from '../../../models/job-application';

@Component({
  selector: 'app-user-job-applications',
  templateUrl: './user-job-applications.component.html',
  styleUrls: ['./user-job-applications.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class UserJobApplicationsComponent implements OnInit {
  userApplications: JobApplication[] = [];
  isLoading = true;
  error: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserApplications();
  }

  fetchUserApplications(): void {
    this.isLoading = true;
    this.http.get<any[]>('http://localhost:5183/api/JobApplication/user').subscribe(
      data => {
        this.userApplications = data.map(app => ({
          ...app,
          appliedOn: new Date(app.appliedOn)
        }));
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching user applications:', error);
        this.error = 'Failed to fetch user applications. Please try again later.';
        this.isLoading = false;
      }
    );
  }
}
