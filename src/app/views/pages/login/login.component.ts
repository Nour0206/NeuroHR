import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  ContainerComponent, RowComponent, ColComponent, CardGroupComponent,
  TextColorDirective, CardComponent, CardBodyComponent, FormDirective,
  InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective
} from '@coreui/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent, RowComponent, ColComponent, CardGroupComponent,
    TextColorDirective, CardComponent, CardBodyComponent, FormDirective,
    InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective,
    ButtonDirective, NgStyle, ReactiveFormsModule, CommonModule, RouterModule
  ]
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          const userInfo = this.authService.getUserInfo();
          const roles = userInfo?.roles ?? [];

          this.toastr.success('Login successful', 'Welcome!');
          if (roles.includes('ADMIN')) {
            this.router.navigate(['/users']);
          } else {
            this.router.navigate(['/job']);
          }
        },
        error: () => {
          this.toastr.error('Invalid credentials', 'Login Failed');
        }
      });
    } else {
      this.toastr.warning('Please fill in all fields', 'Form Incomplete');
    }
  }
}
