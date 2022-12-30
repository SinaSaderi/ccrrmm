import React, { useReducer, createContext, useMemo } from "react";
import { isLoggedInVar } from "graphql/Cache";
import jwtDecode from "jwt-decode";

// import { gql, useQuery } from "@apollo/client";

const initialState = {
  user: null,
  navs: null,
  test: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
    isLoggedInVar(false);
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  test: null,
  // eslint-disable-next-line no-unused-vars
  login: () => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        test: "1234",
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        test: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    isLoggedInVar(true);

    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }
  // eslint-disable-next-line no-unused-vars
  function logout() {
    localStorage.removeItem("jwtToken");
    isLoggedInVar(false);
    dispatch({ type: "LOGOUT" });
  }
  const AuthContextValue = useMemo(() => ({ user: state.user, login, logout }));

  return <AuthContext.Provider value={AuthContextValue} {...props} />;
}

export { AuthContext, AuthProvider };
