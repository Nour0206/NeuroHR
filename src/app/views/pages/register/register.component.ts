import { IconDirective } from '@coreui/icons-angular';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  ContainerComponent, RowComponent, ColComponent, TextColorDirective,
  CardComponent, CardBodyComponent, FormDirective, InputGroupComponent,
  InputGroupTextDirective, FormControlDirective, ButtonDirective
} from '@coreui/angular';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {
  AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule,
  ValidationErrors, ValidatorFn, Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent, RowComponent, ColComponent, TextColorDirective,
    CardComponent, CardBodyComponent, FormDirective, InputGroupComponent,
    InputGroupTextDirective, IconDirective, FormControlDirective,
    ButtonDirective, ReactiveFormsModule, CommonModule
  ]
})
export class RegisterComponent {
  registerForm!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const password = form.get('password')?.value;
      const confirm = form.get('confirmPassword')?.value;
      return password === confirm ? null : { passwordMismatch: true };
    };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.toastr.success('Account created successfully!', 'Success');
          this.router.navigate(['/firstLogin']);
        },
        error: () => {
          this.toastr.error('Registration failed. Please try again.', 'Error');
        }
      });
    } else {
      this.toastr.warning('Please fill all fields correctly', 'Form Error');
    }
  }
}
