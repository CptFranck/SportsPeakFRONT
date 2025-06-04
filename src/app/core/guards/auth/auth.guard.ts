import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import {inject} from "@angular/core";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (!authService.isAuthenticationValid()) {
    authService.setRedirectUrl(state.url);
    router.navigate(['auth']);
    return false;
  }
  return true;
};
