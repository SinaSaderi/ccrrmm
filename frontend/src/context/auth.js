import React, { useReducer, createContext, useMemo } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
  test: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  test: null,
  // eslint-disable-next-line no-unused-vars
  login: (userData) => {},
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
    localStorage.setItem("hasan", "aaaaaaaaaaa");
    localStorage.setItem("jwtToken", userData.token);

    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }
  // eslint-disable-next-line no-unused-vars
  function logout(data) {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  }
  const AuthContextValue = useMemo(() => ({ user: state.user, login, logout }));

  return <AuthContext.Provider value={AuthContextValue} {...props} />;
}

export { AuthContext, AuthProvider };
