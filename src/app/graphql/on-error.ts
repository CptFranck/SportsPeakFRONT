import {onError} from "@apollo/client/link/error";

export const errorLinkHandler = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.map(({message, locations, path}) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );

  if (networkError) console.log(`[Network error]:
                                   Name ${networkError.name},
                                   Message ${networkError.message},
                                   Cause ${networkError.cause},
                                   Stack ${networkError.stack},
                                 `);
});
