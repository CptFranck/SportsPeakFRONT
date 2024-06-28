import {Routes} from '@angular/router';
import {ExercisesComponent} from './page/exercises/exercises/exercises.component';
import {ExerciseTypesComponent} from './page/exercise-types/exercise-types/exercise-types.component';
import {MusclesComponent} from './page/muscle/muscles/muscles.component';
import {AuthComponent} from "./page/auth/auth/auth.component";
import {UserComponent} from "./page/user-account/user/user.component";
import {AuthGuard} from "./guards/auth/authGuard";
import {BackGuard} from "./guards/back/back.guard";

export const routes: Routes = [
  {path: '', redirectTo: '/muscles', pathMatch: 'full'},
  {path: 'login', component: AuthComponent},
  {path: 'exercises', component: ExercisesComponent},
  {path: 'exercise-types', component: ExerciseTypesComponent},
  {path: 'muscles', component: MusclesComponent},
  {
    path: 'back',
    loadChildren: () => import('./page/error/error.routes').then(value => value.ERROR_ROUTES),
    canActivate: [AuthGuard, BackGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'error', loadChildren: () => import('./page/error/error.routes').then(value => value.ERROR_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'error/page-not-found',
    pathMatch: 'full'
  },
];
