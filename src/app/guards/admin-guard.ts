import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
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

    if (payload.role !== 'admin') {
      router.navigate(['/']);
      return false;
    }

    return true;
  } catch (error) {
    router.navigate(['/auth']);
    return false;
  }
};
