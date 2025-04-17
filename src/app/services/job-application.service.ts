import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  private apiUrl = 'http://localhost:3000/applications';

  constructor(private http: HttpClient) {}

 /* getAll(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }

  getById(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/${id}`);
  }

  create(app: Application): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, app);
  }

  update(id: number, app: Application): Observable<Application> {
    return this.http.put<Application>(`${this.apiUrl}/${id}`, app);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }*/
}
