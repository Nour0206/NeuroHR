import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/registerRequest';
import { LoginRequest } from '../models/LoginRequest';
import { AuthResponse } from '../models/AuthResponse';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs/operators';



export interface JwtPayload {
  sub: string;        // souvent l'ID de l'utilisateur
  username: string;   // <-- ajoute ceci si ce n’est pas encore fait
  roles: string[];
  exp?: number;
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl = 'http://localhost:5183/api/auth'; // Change selon ton backend
  
  constructor(private http: HttpClient) {}

  

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, request);
  }

  /* login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request);
  } */
 login(request: LoginRequest): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request).pipe(
    tap(response => {
      localStorage.setItem('token', response.token); // Stockage crucial
    })
  );
}

   saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
 


 
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /* getUserInfo(): JwtPayload | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode<JwtPayload>(token);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
    return null;
  } */
 getUserInfo(): any {
  const token = this.getToken();
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Décodage simple du JWT
    return {
      username: payload.username || payload.sub // Utilisez le champ approprié
    };
  } catch (error) {
    console.error('Error decoding token', error);
    return null;
  }
}
}
