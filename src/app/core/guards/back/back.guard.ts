import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {AuthService} from "../../services/auth/auth.service";
import {filter, from, map, of, switchMap, take} from "rxjs";
import {AuthState} from "../../../shared/model/enum/authState";

export const BackGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const authService = inject(AuthService);
  const currentUserService: CurrentUserService = inject(CurrentUserService)

  return authService.isAuthenticated$.pipe(
    filter(state => state !== AuthState.unknown),
    take(1),
    switchMap(state => {
      if (state !== AuthState.authenticated)
        return from(router.navigate(['auth'])).pipe(map(() => false));
      if (!currentUserService.isStaff())
        return from(router.navigate(['/error/access-denied'])).pipe(map(() => false));
      return of(true);
    })
  );
};
