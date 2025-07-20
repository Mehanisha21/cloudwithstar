import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  apiError: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router 
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(7)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.apiError = null;
      this.loading = true;

      // Simulated backend call; replace with real AuthService and remove setTimeout
      setTimeout(() => {
        this.loading = false;

        // **Fake login logic for illustration**
        if (
          this.loginForm.value.username === 'vendor123' &&
          this.loginForm.value.password === 'password123'
        ) {
          this.router.navigate(['/dashboard']);
        } else {
          this.apiError = 'Invalid username or password.';
        }
      }, 1200);

      // Real implementation:
      /*
      this.authService.login(this.loginForm.value).subscribe({
        next: (result) => {
          // handle successful login
        },
        error: (err) => {
          // show user-friendly error message
          this.apiError = err?.error?.message || 'Login failed. Please try again.';
        },
        complete: () => this.loading = false
      });
      */
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