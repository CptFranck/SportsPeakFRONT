import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {from, map, of, switchMap, take} from "rxjs";

export const BackGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const currentUserService: CurrentUserService = inject(CurrentUserService)

  return currentUserService.currentUser$.pipe(
    take(1),
    switchMap(() => {
      if (!currentUserService.isStaff())
        return from(router.navigate(['/error/access-denied'])).pipe(map(() => false));
      return of(true);
    })
  );
};
