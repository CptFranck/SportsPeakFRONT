import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserLoggedService} from "../../services/userLogged/user-logged.service";
import {AuthService} from "../../services/auth/auth.service";

export const BackGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const userLoggedService: UserLoggedService = inject(UserLoggedService)

  if (!authService.isAuthenticated.value) {
    router.navigate(['auth']);
    return false;
  }

  if (userLoggedService.isStaff())
    return true;

  router.navigate(['error/access-denied']);
  return false;
};
