import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const loginGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isAuth = await firstValueFrom(auth.authState$);

  if (isAuth) {
    return router.parseUrl('/tabs'); // ✅ retornamos el UrlTree
  }

  // Si no está logueado, puede acceder a /login
  return true;
};
