import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobApplication } from '../models/job-application';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  private apiUrl = 'http://localhost:5183/api/JobApplication';

  constructor(private http: HttpClient) {}

  getAll(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(this.apiUrl);
  }

  getById(id: number): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${this.apiUrl}/${id}`);
  }

  create(app: JobApplication): Observable<JobApplication> {
    return this.http.post<JobApplication>(this.apiUrl, app);
  }

  update(id: number, app: JobApplication): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, app);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  uploadResume(formData: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:8501/upload', formData); }
}
