import { Component } from '@angular/core';
import {CommonModule, NgStyle} from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './firstlogin.component.html',
    styleUrls: ['./firstlogin.component.scss'],
    standalone:true,
    imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle,ReactiveFormsModule
      ,CommonModule,RouterModule]
})
export class firstLoginComponent {
  loginForm!: FormGroup;
   showPassword = false; // Add this property
  rememberMe = false;   // Add this property if using remember me checkbox

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
       /*  rememberMe: [false] */ 
    });
  }

   togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.router.navigate(['/onboarding']);
        },
        error: () => alert('Invalid credentials')
      });
    }
  }


  /* // Initialize Google Login button
  initializeGoogleLogin(): void {
    window.onload = () => {
      google.accounts.id.initialize({
        client_id: '721840243575-huqbncs3rme0n04snvgs12u89gi54hm5.apps.googleusercontent.com', // Your client ID
       callback: (response: any) => this.handleGoogleLoginResponse(response)

      });

      google.accounts.id.renderButton(
        document.getElementById('googleLoginButton'), // This is where the button will render
        { theme: 'outline', size: 'large' }           // Optional styling
      );
    };
  }

  // Handle the login response from Google
  handleGoogleLoginResponse(response: any): void {
    const idToken = response.credential;

    // Send the idToken to your backend for validation
    this.loginWithGoogle(idToken);
  }

  // Send the token to your backend for validation and get the JWT
  loginWithGoogle(idToken: string): void {
    fetch('http://localhost:5183/api/Auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ idToken })
    })
    .then(response => response.json())
    .then(data => {
      // Store the JWT token (or other user details)
      localStorage.setItem('auth_token', data.token);
      this.router.navigate(['/dashboard']); // Redirect to the dashboard
    })
    .catch(error => {
      console.error('Google login error:', error);
    });
  }
   */
  }
