import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {inject} from "@angular/core";
import {filter, from, map, of, switchMap, take} from "rxjs";
import {AuthState} from "../../../shared/model/enum/authState";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isAuthenticated$
    .pipe(
      filter(authState => authState !== AuthState.unknown),
      take(1),
      switchMap(authState => {
        if (authState === AuthState.authenticated)
          return of(true);
        authService.setRedirectUrl(state.url);
        return from(router.navigate(['auth'])).pipe(map(() => false));
      })
    );
};
