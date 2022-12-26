import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";

import { AuthContext } from "../context/auth";

// eslint-disable-next-line react/prop-types
function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route {...rest} render={(props) => (user ? <Navigate to="/" /> : <Component {...props} />)} />
  );
}

// eslint-disable-next-line react/prop-types
function NeedLoginRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => (user ? <Component {...props} /> : <Navigate to="/login" />)}
    />
  );
}

export { AuthRoute, NeedLoginRoute };
