import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  apiError: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.apiError = null;
      this.loading = true;
      this.authService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe({
          next: (res) => {
            this.loading = false;
            if (res.success) {
              // Store vendor info, JWT, etc. if needed
              this.router.navigate(['/dashboard']);
            } else {
              this.apiError = res.message || 'Login failed.';
            }
          },
          error: (err) => {
            this.loading = false;
            this.apiError = err?.error?.message || 'Invalid Username or Password.';
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
