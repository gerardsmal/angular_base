import { CanActivateFn } from '@angular/router';
import { AuthServices } from './auth-services';
import { inject } from '@angular/core';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServices)
  return authService.isRoleAdmin();
};
