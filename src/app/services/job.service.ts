import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:5183/api/JobPosting';

  constructor(private http: HttpClient) {}

 

    getJobs(selectedDomaine: string, selectedContractType: string): Observable<Job[]> {
      let params = new HttpParams();
  
      if (selectedDomaine) {
        params = params.set('domaine', selectedDomaine);
      }
      if (selectedContractType) {
        params = params.set('contractType', selectedContractType);
      }
  
      return this.http.get<Job[]>(this.apiUrl, { params });
    }



  getJobById(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }

  updateJob(id: string, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/${id}`, job);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  
}
