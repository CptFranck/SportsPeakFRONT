import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {inject} from "@angular/core";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const url: string = state.url;
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  if (!authService.isAuthenticated.value) {
    authService.setRedirectUrl(url.substring(1));
    router.navigate(['auth']);
    return false;
  }
  return true;
};
