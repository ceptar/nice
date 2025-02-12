import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const createApolloClient = () => {
    return new ApolloClient({
        ssrMode: true, // Ensures Apollo is aware it's running in SSR mode
        link: new HttpLink({
            uri: 'https://discobabes.club/shop-api', // Replace with your GraphQL API URL
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`, // Ensure this token is valid
            },
        }),
        cache: new InMemoryCache(),
    });
};

// import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

// const client = new ApolloClient({
//     ssrMode: true,
//     link: createHttpLink({
//         uri: 'https://current--venduredisco.apollographos.net/graphql',
//         credentials: 'same-origin',
//         headers: {
//             cookie: req.header('Cookie'),
//         },
//     }),
//     cache: new InMemoryCache(),
// });
