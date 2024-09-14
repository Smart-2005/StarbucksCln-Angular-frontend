import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const roleBasedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.roles$.pipe(
    map((role) => {
      const requiredRole = route.data['role'];
      if (role === requiredRole) {
        return true; // Access granted
      } else {
        router.navigate(['/not-authorized']); // Redirect if unauthorized
        return false; // Access denied
      }
    })
  );
};
