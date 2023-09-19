import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs';

export const noAuthGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validateToken()
    .pipe(
      tap(
        valid => {
          if( !valid ){
            localStorage.removeItem('token');
            router.navigateByUrl('auth')
            return false
          }else{
            return true
          }
        }
      )
    );
};
