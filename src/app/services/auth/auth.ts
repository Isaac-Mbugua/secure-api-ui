import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, Otp, Register } from '../../models/auth-model';
import { catchError, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ErrorHandler } from '../../utils/error-handler';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  apiUrl: string = 'http://localhost:3000/api';
  // 'https://secure-api-authentication-production.up.railway.app/api';
  constructor(private router: Router, private http: HttpClient) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiration = payload.exp;
    return Math.floor(Date.now() / 1000) < expiration;
  }

  registerUser(
    userInfo: Register
  ): Observable<{ message: string; createdUser: Register }> {
    return this.http
      .post<{ message: string; createdUser: Register }>(
        `${this.apiUrl}/register`,
        userInfo
      )
      .pipe(
        catchError((error) => ErrorHandler.errorHandler(error, this.router))
      );
  }

  loginUser(
    credentials: Login
  ): Observable<{ message: string; token: string }> {
    return this.http
      .post<{ message: string; token: string }>(
        `${this.apiUrl}/login`,
        credentials
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('authToken', response.token);
        }),
        catchError((error) => ErrorHandler.errorHandler(error, this.router))
      );
  }

  verifyOtp(otp: Otp): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(`${this.apiUrl}/verify-otp`, otp)
      .pipe(
        catchError((error) => ErrorHandler.errorHandler(error, this.router))
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/auth']);
  }
}
