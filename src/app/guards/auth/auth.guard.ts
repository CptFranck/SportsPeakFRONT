import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {inject} from "@angular/core";

export const AuthGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  if (!authService.isAuthenticated.value) {
    router.navigate(['auth']);
    return false;
  }
  return true;
};
