import {Apollo, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {ApplicationConfig, inject} from '@angular/core';
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core';
import {errorLinkHandler} from "./on-error";

// URL of the GraphQL server here
const uri = 'http://localhost:8080/service/api/graphql';

function apolloOptionsFactory(): ApolloClientOptions<any> {
  const httpLink = inject(HttpLink);
  const HttpLinkHandler = httpLink.create({uri})
  return {
    link: ApolloLink.from([
      errorLinkHandler,
      HttpLinkHandler,
    ]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: "all"
      }
    }
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];
