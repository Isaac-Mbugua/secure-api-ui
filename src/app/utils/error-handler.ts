import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

export class ErrorHandler {
  static errorHandler(error: HttpErrorResponse, router: Router) {
    if (error.status === 401) {
      const message = error.error.message.toLowerCase() || '';
      if (message.includes('token expired') || message.includes('expired')) {
        router.navigate(['auth', 'verify-otp']);
      } else {
        router.navigate(['auth']);
      }
    }

    let errorMsg = 'An unknown error occurred!';

    if (error.error) {
      if (error.error.message) {
        errorMsg = error.error.message;
      }
      if (error.error.details) {
        errorMsg += ` - ${error.error.details}`;
      }
    }

    return throwError(() => new Error(errorMsg));
  }
}
