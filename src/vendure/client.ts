import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import {
    GraphQLClient,
    RequestDocument,
    RequestMiddleware,
    ResponseMiddleware,
    Variables,
} from 'graphql-request';

// If using bearer-token based session management, we'll store the token
// in localStorage using this key.
const AUTH_TOKEN_KEY = 'auth_token';

const API_URL = 'https://discobabes.club/shop-api';

const isBrowser = typeof window !== 'undefined';

export const requestMiddleware = (request: RequestInit) => {
    if (isBrowser) {
        const token = localStorage.getItem('authToken');
        if (token) {
            request.headers = {
                ...request.headers,
                Authorization: `Bearer ${token}`,
            };
        }
    }
    return request;
};

// Check all responses for a new session token
const responseMiddleware: ResponseMiddleware = (response) => {
    if (!(response instanceof Error) && !response.errors) {
        const authHeader = response.headers.get('vendure-auth-token');
        if (authHeader) {
            // If the session token has been returned by the Vendure
            // server, we store it in localStorage
            localStorage.setItem(AUTH_TOKEN_KEY, authHeader);
        }
    }
};

const client = new GraphQLClient(API_URL, {
    // Required for cookie-based sessions
    credentials: 'include',
    requestMiddleware,
    responseMiddleware,
});

/**
 * Sets the languageCode to be used for all subsequent requests.
 */
export function setLanguageCode(languageCode: string | undefined) {
    if (!languageCode) {
        client.setEndpoint(API_URL);
    } else {
        client.setEndpoint(`${API_URL}?languageCode=${languageCode}`);
    }
}

/**
 * Sets the channel token to be used for all subsequent requests.
 */
export function setChannelToken(channelToken: string | undefined) {
    if (!channelToken) {
        client.setHeader('vendure-token', undefined);
    } else {
        client.setHeader('vendure-token', channelToken);
    }
}

/**
 * Makes a GraphQL request using the `graphql-request` client.
 */
export function request<T, V extends Variables = Variables>(
    document: RequestDocument | TypedDocumentNode<T, V>,
    variables: Record<string, any> = {},
) {
    return client.request(document, variables);
}
