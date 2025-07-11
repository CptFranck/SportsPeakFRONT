import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {from, map, take} from "rxjs";

export const BackGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const currentUserService: CurrentUserService = inject(CurrentUserService);

  return currentUserService.currentUser$.pipe(
    take(1),
    map(() => {
      if (currentUserService.isStaff())
        return true;
      from(router.navigate(['/error/access-denied']));
      return false;
    })
  );
};
