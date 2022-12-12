/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "context/auth";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";

// Graphql provider
import GqlProvider from "graphql/Providers";
import { LoadingProvider } from "context/loading";

import App from "App";

ReactDOM.render(
  <AuthProvider>
    <GqlProvider>
      <LoadingProvider>
        <BrowserRouter>
          <MaterialUIControllerProvider>
            <App />
          </MaterialUIControllerProvider>
        </BrowserRouter>
      </LoadingProvider>
    </GqlProvider>
  </AuthProvider>,
  document.getElementById("root")
);
