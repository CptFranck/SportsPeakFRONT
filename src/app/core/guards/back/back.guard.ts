import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {CurrentUserService} from "../../services/current-user/current-user.service";

export const BackGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const currentUserService: CurrentUserService = inject(CurrentUserService)

  if (currentUserService.isStaff())
    return true;

  router.navigate(['/error/access-denied']);
  return false;
};
