import {ApplicationConfig} from '@angular/core';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter, RouterLink, RouterLinkActive, RouterOutlet,} from '@angular/router';

import {routes} from './app.routes';
import {graphqlProvider} from './core/graphql/graphql.provider';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    graphqlProvider,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
};
