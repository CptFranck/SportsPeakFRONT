import {Apollo, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink, HttpLinkHandler} from 'apollo-angular/http';
import {ApplicationConfig, inject} from '@angular/core';
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core';
import {AlertService} from "../services/alert/alert.service";
import {ErrorResponse, onError} from "@apollo/client/link/error";
import {setContext} from "@apollo/client/link/context";
import {TokenService} from "../services/token/token.service";
import {AuthToken} from "../../shared/model/dto/token";
import {environment} from "../environment";

// URL of the GraphQL server here
const uri: string = environment.apiHttpBaseUrl + environment.graphqlEndPoint;

function apolloOptionsFactory(): ApolloClientOptions<any> {
  const httpLink: HttpLink = inject(HttpLink);
  const alertService: AlertService = inject(AlertService)
  const tokenService: TokenService = inject(TokenService)

  const auth: ApolloLink = setContext(() => {
    const authToken: AuthToken | null = tokenService.getCurrentToken();
    if (!authToken) {
      return {};
    }
    return {
      headers: {
        Authorization: `${authToken.tokenType} ${authToken.accessToken}`,
      },
    };
  });

  const errorLinkHandler: ApolloLink = onError((errorResponse: ErrorResponse) => {
    if (errorResponse.graphQLErrors)
      alertService.graphQLErrorAlertHandler(errorResponse.graphQLErrors);
    if (errorResponse.networkError)
      alertService.createNetWorkErrorAlert(errorResponse.networkError)
  });

  const httpLinkHandler: HttpLinkHandler = httpLink.create({uri})

  return {
    link: ApolloLink.from([
      auth,
      errorLinkHandler,
      httpLinkHandler,
    ]),
    cache: new InMemoryCache(),
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];
