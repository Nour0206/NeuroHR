import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { signalSetFn } from '@angular/core/primitives/signals';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable,tap  } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = signal(false);
  private apiUrl = 'http://localhost:3000/auth';
  private currentUserSubject = new BehaviorSubject
  
  <User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }
 
  // Login method
  login(username: string, password: string): Observable<User> {
    return this.http.post<User>('/login', { username, password }).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  // Logout method
  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  // Auto-login from localStorage
  autoLogin(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUserSubject.next(JSON.parse(userData));
    }
  }

  // Check if user is logged in
  get isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // Get current user role
  get currentRole(): 'admin' | 'hr' | 'candidate' | null {
    return this.currentUserSubject.value?.role || null;
  }


}
