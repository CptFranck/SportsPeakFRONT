import {ApplicationConfig} from '@angular/core';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter, RouterLink, RouterLinkActive, RouterOutlet,} from '@angular/router';

import {routes} from './app.routes';
import {graphqlProvider} from './graphql/graphql.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    graphqlProvider,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
};
