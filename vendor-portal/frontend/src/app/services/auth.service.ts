import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

interface LoginResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  
  private usernameSubject = new BehaviorSubject<string | null>(this.getUsernameFromStorage());
  username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(res => {
        if (res.success) {
          // Save username locally to track logged-in user
          this.setUsername(username);
        }
      })
    );
  }

  private setUsername(username: string) {
    this.usernameSubject.next(username);
    localStorage.setItem('username', username);
  }

  private getUsernameFromStorage(): string | null {
    return localStorage.getItem('username');
  }

  getUsername(): string | null {
    return this.usernameSubject.value;
  }

  logout() {
    this.usernameSubject.next(null);
    localStorage.removeItem('username');
  }
}
