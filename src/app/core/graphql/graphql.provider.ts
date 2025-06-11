import {Apollo, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {ApplicationConfig, inject} from '@angular/core';
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core';
import {AlertService} from "../services/alert/alert.service";
import {ErrorResponse, onError} from "@apollo/client/link/error";
import {setContext} from "@apollo/client/link/context";
import {TokenService} from "../services/token/token.service";
import {environment} from "../environment";

const GRAPHQL_API_URI = environment.apiHttpBaseUrl + environment.graphqlEndPoint;

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];

function apolloOptionsFactory(): ApolloClientOptions<any> {
  const httpLink: HttpLink = inject(HttpLink);
  const alertService: AlertService = inject(AlertService)
  const tokenService: TokenService = inject(TokenService)

  return {
    link: createApolloLink(tokenService, alertService, httpLink),
    cache: new InMemoryCache(),
  };
}

function createApolloLink(tokenService: TokenService, alertService: AlertService, httpLink: HttpLink): ApolloLink {
  return ApolloLink.from([
    setAuthHeaders(tokenService),
    handleGraphQLErrors(alertService),
    httpLink.create({
      uri: GRAPHQL_API_URI,
      withCredentials: true,
    }),
  ]);
}

function setAuthHeaders(tokenService: TokenService): ApolloLink {
  return setContext((operation, context) => {
    console.log("auth", context)
    const authToken = tokenService.getCurrentToken();
    if (!authToken) return {...context};
    return {
      headers: {
        ...context["headers"],
        Authorization: `${authToken.tokenType} ${authToken.accessToken}`,
      },
    };
  });
}

function handleGraphQLErrors(alertService: AlertService): ApolloLink {
  return onError((errorResponse: ErrorResponse) => {
    if (errorResponse.graphQLErrors)
      alertService.graphQLErrorAlertHandler(errorResponse.graphQLErrors);
    if (errorResponse.networkError)
      alertService.createNetWorkErrorAlert(errorResponse.networkError);
  });
}
