import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4pthy1d2mvv01w7507k67he/master',
  cache: new InMemoryCache,
})