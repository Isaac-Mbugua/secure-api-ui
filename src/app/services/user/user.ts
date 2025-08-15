import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../../models/auth-model';
import { catchError, Observable } from 'rxjs';
import { ErrorHandler } from '../../utils/error-handler';

@Injectable({
  providedIn: 'root',
})
export class User {
  constructor(private http: HttpClient, private router: Router) {}
  apiUrl: string = 'http://localhost:3000/api';
  // 'https://secure-api-authentication-production.up.railway.app/api';

  getUserProfile(): Observable<{ user: Register }> {
    return this.http
      .get<{ user: Register }>(`${this.apiUrl}/profile`)
      .pipe(
        catchError((error) => ErrorHandler.errorHandler(error, this.router))
      );
  }

  getAllUsers(): Observable<{ users: Register[] }> {
    return this.http
      .get<{ users: Register[] }>(`${this.apiUrl}/users`)
      .pipe(
        catchError((error) => ErrorHandler.errorHandler(error, this.router))
      );
  }
}
