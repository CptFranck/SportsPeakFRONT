import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserLoggedService} from "../../services/userLogged/user-logged.service";
import {AuthService} from "../../services/auth/auth.service";

export const BackGuard: CanActivateFn = () => {
  const userLoggedService: UserLoggedService = inject(UserLoggedService)
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isAuthenticated.value) {
    router.navigate(['/login']);
    return false;
  }

  if (userLoggedService.isStaff())
    return true;

  router.navigate(['error/accessDenied']);
  return false;
};
