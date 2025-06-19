import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {inject} from "@angular/core";
import {from, map, take} from "rxjs";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isAuthenticated$
    .pipe(
      take(1),
      map(isAuth => {
        if (isAuth)
          return true;
        authService.setRedirectUrl(state.url);
        from(router.navigate(['auth']))
        return false;
      })
    );
};
