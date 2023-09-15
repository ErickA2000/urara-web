import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../auth/services/auth.service';

export const inSesionGuard: CanActivateFn = (route, state) => {
  
  // const authService = inject(AuthService);
  const router = inject(Router);

  return localStorage.getItem('token') ? router.navigate(['/site/home']) : true

};
