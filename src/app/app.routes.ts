import {Routes} from '@angular/router';
import {AuthComponent} from "./page/auth/auth/auth.component";
import {AuthGuard} from "./core/guards/auth/auth.guard";
import {UserComponent} from "./page/user-account/user/user.component";
import {BackGuard} from "./core/guards/back/back.guard";
import {HomeComponent} from "./page/home/home.component";
import {CommunityComponent} from "./page/community/community/community.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {
    path: 'my-fitness-plan',
    pathMatch: 'prefix',
    loadChildren: () => import('./page/my-fitness-plan/my-fitness-plan.routes').then(value => value.MY_FITNESS_PLAN_ROUTES),
    canActivate: [AuthGuard]
  },
  {
    path: 'explore',
    pathMatch: 'prefix',
    loadChildren: () => import('./page/explore/explore.routes').then(value => value.EXPLORE_ROUTES),
  },
  {
    path: 'docs',
    pathMatch: 'prefix',
    loadChildren: () => import('./page/docs/docs.routes').then(value => value.DOCS_ROUTES),
  },
  {path: 'community', component: CommunityComponent},
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'back',
    pathMatch: 'prefix',
    loadChildren: () => import('./page/back/back.routes').then(value => value.BACK_ROUTES),
    canActivate: [AuthGuard, BackGuard]
  },
  {
    path: 'error',
    pathMatch: 'prefix',
    loadChildren: () => import('./page/error/error.routes').then(value => value.ERROR_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'error/page-not-found',
    pathMatch: 'full'
  },
];
