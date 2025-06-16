import {Apollo, APOLLO_OPTIONS} from 'apollo-angular';
import {ApplicationConfig, inject, Injector} from '@angular/core';
import {ApolloClientOptions, ApolloLink, FetchResult, InMemoryCache} from '@apollo/client/core';
import {AlertService} from "../services/alert/alert.service";
import {ErrorResponse, onError} from "@apollo/client/link/error";
import {setContext} from "@apollo/client/link/context";
import {environment} from "../environment";
import {HttpLink} from "apollo-angular/http";
import {TokenService} from "../services/token/token.service";
import {AuthService} from "../services/auth/auth.service";
import {Observable} from 'zen-observable-ts';

const GRAPHQL_API_URI = environment.apiHttpBaseUrl + environment.graphqlEndPoint;

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];

function apolloOptionsFactory(): ApolloClientOptions<any> {
  return {
    link: createApolloLink(),
    cache: new InMemoryCache(),
  };
}

function createApolloLink(): ApolloLink {
  const httpLink = inject(HttpLink);

  return ApolloLink.from([
    setAuthHeaders(),
    handleErrors(),
    httpLink.create({
      uri: GRAPHQL_API_URI,
      withCredentials: true,
    }),
  ]);
}

function setAuthHeaders(): ApolloLink {
  const tokenService = inject(TokenService);

  return setContext(() => {
    const authToken = tokenService.getAuthToken();
    if (!authToken) {
      return {};
    }
    return {
      headers: {
        Authorization: `${authToken.tokenType} ${authToken.accessToken}`,
      },
    };
  });
}

function handleErrors(): ApolloLink {
  const alertService = inject(AlertService)
  const tokenService = inject(TokenService);
  const injector = inject(Injector);

  return onError(({graphQLErrors, networkError, operation, forward}: ErrorResponse) => {
    // lazy loading (circular dependency)
    const authService = injector.get(AuthService);

    if (networkError)
      alertService.createNetWorkErrorAlert(networkError);

    if (graphQLErrors)
      for (let err of graphQLErrors) {
        if (err.extensions?.['code'] === "UNAUTHENTICATED") {
          return new Observable<FetchResult>((observer) => {
            authService.refreshToken();

            const sub = authService.isAuthenticated$.subscribe((isAuth) => {
              if (isAuth) {
                const newToken = tokenService.getAuthToken();
                operation.setContext({
                  headers: {
                    Authorization: `${newToken?.tokenType} ${newToken?.accessToken}`,
                  },
                });

                forward(operation).subscribe({
                  next: (result) => observer.next(result),
                  error: (err) => observer.error(err),
                  complete: () => observer.complete(),
                });

                sub.unsubscribe();
              } else {
                observer.error(err);
                sub.unsubscribe();
              }
            });
          });
        } else {
          alertService.createGraphQLErrorAlert(err);
        }
      }
    return undefined;
  });
}
