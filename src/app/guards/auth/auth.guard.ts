import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {inject} from "@angular/core";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const url: string = state.url;
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  if (!authService.isAuthenticated.value) {
    router.navigate(['auth']);
    return false;
  }
  authService.setRedirectUrl(url);
  return true;
};
