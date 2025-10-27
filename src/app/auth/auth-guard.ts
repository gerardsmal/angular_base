import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from './auth-services';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthServices);
  const router = inject(Router);

  console.log("[authGuard] ->" + auth.isAutentificated());

  if (!auth.isAutentificated()) {
    router.navigate(['login']);
    return false;
  }
  return true;
}