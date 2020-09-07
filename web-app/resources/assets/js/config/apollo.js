import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import VueApollo from "vue-apollo";
import { vm } from "@/app.js";
import { createUploadLink } from "apollo-upload-client";
import config from "./config.js";
const token = document.head.querySelector('meta[name="csrf-token"]').content;

//Sets the headers using Apollo Http Link
const httpLink = new HttpLink({
    headers: {
        "X-CSRF-TOKEN": token,
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json"
    }
});

//Sets a global error handler using the Apollo Error Link
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

//Combines the Apollo Http and Error links
const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache();

// Create the apollo client
export const Apollo = new ApolloClient({
    link: ApolloLink.from([
        new createUploadLink({
            uri: config.graphqlEndpoint
        })
    ]),
    cache,
    connectToDevTools: true
});

export const apolloProvider = new VueApollo({
    defaultClient: Apollo
});
