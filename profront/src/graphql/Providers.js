/* eslint-disable import/first */
import React from "react";

// import { createHttpLink } from "apollo-link-http";
import { createUploadLink } from "apollo-upload-client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// import { onError } from "@apollo/client/link/error";
import { setContext } from "apollo-link-context";

console.log( process );
console.log(",,,", process.env.REACT_APP_SERVER_URL);

// const { REACT_APP_SERVER_URL } = process.env;
const REACT_APP_SERVER_URL = "http://127.0.0.1:8000";

const httpLink = createUploadLink({ uri: `${REACT_APP_SERVER_URL}/graphql/` });

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");

  return {
    headers: {
      Authorization: token,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

// eslint-disable-next-line react/prop-types
export default function GqlProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
