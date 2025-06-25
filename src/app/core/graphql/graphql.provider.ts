import {Apollo, APOLLO_OPTIONS} from 'apollo-angular';
import {ApplicationConfig, inject, Injector} from '@angular/core';
import {ApolloClientOptions, ApolloLink, FetchResult, InMemoryCache, Observable} from '@apollo/client/core';
import {AlertService} from "../services/alert/alert.service";
import {ErrorResponse, onError} from "@apollo/client/link/error";
import {setContext} from "@apollo/client/link/context";
import {environment} from "../environment";
import {HttpLink} from "apollo-angular/http";
import {TokenService} from "../services/token/token.service";
import {AuthService} from "../services/auth/auth.service";
import {HttpErrorResponse} from "@angular/common/module.d-CnjH8Dlt";
import {GraphQLFormattedError} from "graphql/error";

const GRAPHQL_API_URI = environment.apiHttpBaseUrl + environment.graphqlEndPoint;

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];

function apolloOptionsFactory(): ApolloClientOptions<any> {
  const httpLink = inject(HttpLink);

  return {
    link: ApolloLink.from([
      setAuthHeaders(),
      handleErrors(),
      httpLink.create({
        uri: GRAPHQL_API_URI,
        withCredentials: true,
      }),
    ]),
    cache: new InMemoryCache(),
  };
}

function setAuthHeaders(): ApolloLink {
  const tokenService = inject(TokenService);

  return setContext(() => {
    const authToken = tokenService.getAuthToken();
    if (!authToken) return {};
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

    handleGraphQLErrors(graphQLErrors, alertService);

    if (networkError) {
      const httpErrRes = networkError as HttpErrorResponse;
      if (httpErrRes.status === 401 && tokenService.isAuthTokenExpired) {
        if (operation.operationName !== 'refreshToken') {
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
                observer.error(httpErrRes);
                sub.unsubscribe();
              }
            });
          });
        } else {
          console.log("Erreur (refresh impossible):", httpErrRes)
          alertService.createGraphQLErrorAlert(httpErrRes);
        }
      } else {
        alertService.createNetWorkErrorAlert(httpErrRes);
      }
    }

    return undefined;
  });
}

function handleGraphQLErrors(errors: readonly GraphQLFormattedError[] | undefined, alertService: AlertService) {
  if (!errors) return;

  for (const err of errors) {
    const code = err.extensions?.['code'];
    switch (code) {
      case 'REFRESH_TOKEN_EXPIRED':
        alertService.addInfoAlert("Session has expired");
        break;
      case 'TOKEN_MISSING':
        console.warn("TOKEN_MISSING");
        break;
      default:
        alertService.createGraphQLErrorAlert(err);
        break;
    }
  }
}
