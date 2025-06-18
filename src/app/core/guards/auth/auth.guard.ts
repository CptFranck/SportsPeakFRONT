import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {inject} from "@angular/core";
import {take, tap} from "rxjs";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isAuthenticated$
    .pipe(
      take(1),
      tap(isAuth => {
        if (!isAuth) {
          authService.setRedirectUrl(state.url);
          router.navigate(['auth']);
        }
      }));
};
