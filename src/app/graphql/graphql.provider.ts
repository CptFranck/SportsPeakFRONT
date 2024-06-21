import {Apollo, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink, HttpLinkHandler} from 'apollo-angular/http';
import {ApplicationConfig, inject} from '@angular/core';
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core';
import {AlertService} from "../services/alert/alert.service";
import {ErrorResponse, onError} from "@apollo/client/link/error";
import {setContext} from "@apollo/client/link/context";
import {TokenService} from "../services/token/token.service";
import {AuthToken} from "../interface/dto/token";

// URL of the GraphQL server here
const uri: string = 'http://localhost:8080/service/api/graphql';

function apolloOptionsFactory(): ApolloClientOptions<any> {
  const httpLink: HttpLink = inject(HttpLink);
  const alertService: AlertService = inject(AlertService)
  const tokenService: TokenService = inject(TokenService)

  const auth: ApolloLink = setContext(() => {
    const authToken: AuthToken | null = tokenService.getCurrentToken();
    if (!authToken) {
      return {};
    }
    const isExpired: boolean = authToken.expiration < new Date();
    if (isExpired) {
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

  const HttpLinkHandler: HttpLinkHandler = httpLink.create({uri})
  return {
    link: ApolloLink.from([
      auth,
      errorLinkHandler,
      HttpLinkHandler,
    ]),
    cache: new InMemoryCache(),
    // defaultOptions: {
    //   query: {
    //     fetchPolicy: 'no-cache',
    //     errorPolicy: 'all'
    //   },
    //   watchQuery: {
    //     fetchPolicy: 'no-cache',
    //     errorPolicy: 'all'
    //   },
    //   mutate: {
    //     fetchPolicy: 'no-cache',
    //     errorPolicy: "all"
    //   }
    // }
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];
