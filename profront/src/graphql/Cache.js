/* eslint-disable no-unused-vars */
import { InMemoryCache, Reference, makeVar } from "@apollo/client";

const isLoggedInVar = makeVar(!!localStorage.getItem("jwtToken"));

const navItemsVar = makeVar([]);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },

        cartItems: {
          read() {
            return navItemsVar();
          },
        },
      },
    },
  },
});

export { isLoggedInVar, navItemsVar, cache };
