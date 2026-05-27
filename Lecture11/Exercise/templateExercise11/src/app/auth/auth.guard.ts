import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../api.service';


export const authGuard: CanActivateFn = () => {
  const apiService = inject(ApiService);
  const router = inject(Router);

  if (apiService.loginStatus().loggedIn) {
    return true;
  }
  return router.createUrlTree(['/login']);
};
