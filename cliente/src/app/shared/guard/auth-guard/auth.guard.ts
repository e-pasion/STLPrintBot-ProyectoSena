import { Injectable, inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

 export const authGuard: CanActivateFn = (route, state) => {
    const authService=inject(AuthServiceService)
    const router=inject(Router);
    if (authService.isLoggedIn()) return true;
    router.navigate(["/unauthorized"])
   return false;
 };
