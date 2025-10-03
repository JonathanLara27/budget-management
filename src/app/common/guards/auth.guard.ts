import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = await firstValueFrom(auth.authState$);

  if (!user) {
    // Redirige al login
    return router.parseUrl('/login'); // ✅ Devuelve UrlTree
  }

  // Devuelve true si hay usuario
  return true;
};
