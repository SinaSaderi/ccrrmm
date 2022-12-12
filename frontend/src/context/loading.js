/* eslint-disable react/jsx-no-constructed-context-values */

import { createContext, useContext, useState } from "react";

import PropTypes from "prop-types";

const LoadingContext = createContext({
  loading: false,
  setLoading: null,
});

// eslint-disable-next-line react/prop-types
export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const value = { loading, setLoading };
  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}

LoadingProvider.defaultProps = {
  children: PropTypes.node,
};

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}
