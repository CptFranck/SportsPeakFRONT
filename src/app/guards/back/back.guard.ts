import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserLoggedService} from "../../services/userLogged/user-logged.service";

export const BackGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const userLoggedService: UserLoggedService = inject(UserLoggedService)

  if (userLoggedService.isStaff())
    return true;

  router.navigate(['/error/access-denied']);
  return false;
};
