import { ApplicationConfig } from '@angular/core';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  provideRouter,
} from '@angular/router';

import { routes } from './app.routes';
import { graphqlProvider } from './graphql/graphql.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(),
    graphqlProvider,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
};
