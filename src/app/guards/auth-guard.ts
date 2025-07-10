import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken');

  if (!token) {
    router.navigate(['/auth']);
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = Date.now() >= payload.exp * 1000;

    if (isExpired) {
      localStorage.removeItem('authToken');
      router.navigate(['/auth']);
      return false;
    }

    return true;
  } catch (e) {
    router.navigate(['/auth']);
    return false;
  }
};
