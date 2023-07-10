import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

export const clientGuard: CanActivateFn = (route, state) => {
  const authService= inject(AuthServiceService);
  const router= inject(Router);
  if (authService.isClient()) return true;
  router.navigate(["/unauthorized"]);
  return false;
};
