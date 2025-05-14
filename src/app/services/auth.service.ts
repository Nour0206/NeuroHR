import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from '../models/AuthResponse';
import { LoginRequest } from '../models/LoginRequest';
import { RegisterRequest } from '../models/registerRequest';

export interface JwtPayload {
  sub?: string;
  id?: string;
  username: string;
  roles: string[];
  exp?: number;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[]; // Add this property
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:5183/api/auth'; // Backend URL

  constructor(private http: HttpClient) {}

  // Registration method
  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, request);
  }

  // Login method
  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request).pipe(
      tap(response => {
        localStorage.setItem('token', response.token); // Save the token in localStorage

        // Decode the token to extract the userId from the 'sub' claim
        const payload = JSON.parse(atob(response.token.split('.')[1]));
        console.log('Decoded Token Payload:', payload); // Debugging log
        const userId = payload.sub; // 'sub' is the userId in the token
        localStorage.setItem('userId', userId); // Save userId in localStorage
      })
    );
  }

  // Save the token to localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Get user info from the token
  getUserInfo(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload: JwtPayload = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
      return {
        username: payload.username || payload.sub, // Use 'sub' if 'username' is unavailable
        roles: Array.isArray(payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
          ? payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
          : [payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']] // Extract roles from the correct key
      };
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  // Get user ID from localStorage
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
