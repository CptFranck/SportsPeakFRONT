import {Routes} from "@angular/router";
import {UsersManagementComponent} from "./user-management/users-management/users-management.component";
import {RolesComponent} from "./role/roles/roles.component";
import {PrivilegesComponent} from "./privilege/privileges/privileges.component";

export const BACK_ROUTES: Routes = [
  {
    path: '',
    children: [
      {path: 'users', component: UsersManagementComponent},
      {path: 'roles', component: RolesComponent},
      {path: 'privileges', component: PrivilegesComponent},
    ],
  }
]
