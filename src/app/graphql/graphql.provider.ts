import {Apollo, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {ApplicationConfig, inject} from '@angular/core';
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core';
import {AlertService} from "../services/alert/alert.service";
import {onError} from "@apollo/client/link/error";
import {setContext} from "@apollo/client/link/context";
import {TokenService} from "../services/token/token.service";

// URL of the GraphQL server here
const uri = 'http://localhost:8080/service/api/graphql';

function apolloOptionsFactory(): ApolloClientOptions<any> {
  const httpLink = inject(HttpLink);
  const alertService = inject(AlertService)
  const tokenService = inject(TokenService)

  const auth = setContext((operation, context) => {
    const authToken = tokenService.getCurrentToken();
    if (!authToken) {
      return {};
    }
    const isExpired = authToken.expiration < new Date();
    if (isExpired) {
      return {};
    }
    return {
      headers: {
        Authorization: `${authToken.tokenType} ${authToken.accessToken}`,
      },
    };
  });

  const errorLinkHandler = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
      graphQLErrors.map((graphQlError) =>
        alertService.createGraphQLErrorAlert(graphQlError)
      );

    if (networkError)
      alertService.createNetWorkErrorAlert(networkError)
  });

  const HttpLinkHandler = httpLink.create({uri})
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
