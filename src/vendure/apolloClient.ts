import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

let apolloClient = null;

export function createApolloClient() {
  if (apolloClient) {
    return apolloClient;
  }

  return apolloClient = new ApolloClient({
    link: new HttpLink({
      uri: "https://discobabes.club/shop-api",
    }),
    cache: new InMemoryCache(),
  });
}

/* const AUTH_TOKEN_KEY = 'auth_token';

// Function to get a valid token
const getValidToken = async () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
};

const httpLink = new HttpLink({
    uri: 'https://discobabes.club/shop-api', // Replace with your GraphQL API URL
});

const authLink = setContext(async (_, { headers }) => {
    const token = await getValidToken();
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
        const context = operation.getContext();
        const authHeader = context.response?.headers?.get('vendure-auth-token');
        if (authHeader) {
            localStorage.setItem(AUTH_TOKEN_KEY, authHeader);
        }
        return response;
    });
});

const cache = new InMemoryCache();

export const createApolloClient  = new ApolloClient({
    ssrMode: typeof window === 'undefined', // Ensures SSR mode only on the server
    link: ApolloLink.from([authLink, afterwareLink, httpLink]),
    cache,
}); */