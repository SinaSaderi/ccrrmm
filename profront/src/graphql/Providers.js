/* eslint-disable import/first */
import React from "react";

// import { createHttpLink } from "apollo-link-http";
import { createUploadLink } from "apollo-upload-client";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";
// import { onError } from "@apollo/client/link/error";
import { setContext } from "apollo-link-context";

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

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    navItems: [ID!]!
  }
`;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  typeDefs,
});

// eslint-disable-next-line react/prop-types
export default function GqlProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
