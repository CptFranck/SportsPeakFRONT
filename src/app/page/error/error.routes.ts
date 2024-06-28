import {Routes} from "@angular/router";
import {AccessDeniedComponent} from "./access-denied/access-denied.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

export const ERROR_ROUTES: Routes = [
  {
    path: '',
    children: [
      {path: 'access-denied', component: AccessDeniedComponent},
      {path: 'page-not-found', component: PageNotFoundComponent},
    ]
  }
]
