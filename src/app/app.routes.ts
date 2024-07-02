import {Routes} from '@angular/router';
import {ExercisesComponent} from './page/exercises/exercises/exercises.component';
import {ExerciseTypesComponent} from './page/exercise-types/exercise-types/exercise-types.component';
import {MusclesComponent} from './page/muscle/muscles/muscles.component';
import {AuthComponent} from "./page/auth/auth/auth.component";
import {AuthGuard} from "./guards/auth/auth.guard";
import {UserComponent} from "./page/user-account/user/user.component";
import {BackGuard} from "./guards/back/back.guard";
import {HomeComponent} from "./page/home/home.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'exercises', component: ExercisesComponent},
  {path: 'exercise-types', component: ExerciseTypesComponent},
  {path: 'muscles', component: MusclesComponent},
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'error',
    pathMatch: 'prefix',
    loadChildren: () => import('./page/error/error.routes').then(value => value.ERROR_ROUTES)
  },
  {
    path: 'back',
    pathMatch: 'prefix',
    loadChildren: () => import('./page/back/back.routes').then(value => value.BACK_ROUTES),
    canActivate: [AuthGuard, BackGuard]
  },
  {
    path: '**',
    redirectTo: 'error/page-not-found',
    pathMatch: 'full'
  },
];
