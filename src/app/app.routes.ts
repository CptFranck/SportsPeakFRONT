import {Routes} from '@angular/router';
import {ExercisesComponent} from './page/exercises/exercises/exercises.component';
import {ExerciseTypesComponent} from './page/exercise-types/exercise-types/exercise-types.component';
import {MusclesComponent} from './page/muscle/muscles/muscles.component';
import {LoginComponent} from "./page/auth/login/login.component";
import {UsersComponent} from "./page/userManagement/users/users.component";
import {RolesComponent} from "./page/role/roles/roles.component";
import {PrivilegesComponent} from "./page/privilege/privileges/privileges.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'exercises', component: ExercisesComponent},
  {path: 'exercise-types', component: ExerciseTypesComponent},
  {path: 'muscles', component: MusclesComponent},
  {path: 'users', component: UsersComponent},
  {path: 'roles', component: RolesComponent},
  {path: 'privileges', component: PrivilegesComponent},
  {path: '', redirectTo: '/muscles', pathMatch: 'full'},
];
