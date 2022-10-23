/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// react
import React, { useContext, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/panorama-of-dubai.jpg";

// Authentication
import { gql, useMutation } from "@apollo/client";
// import gql from 'graphql-tag';
import { AuthContext } from "context/auth";
import { useForm } from "util/hooks";

const REGISTER_USER = gql`
  mutation createUser($email: String!, $password: String!, $confirmPassword: String!) {
    createUser(input: { email: $email, password: $password, confirmPassword: $confirmPassword }) {
      ok
      token
      user {
        id
        email
      }
    }
  }
`;

function Cover() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const navigation = useNavigate();

  // eslint-disable-next-line no-use-before-define
  const { onChange, onSubmit, values } = useForm(registerUser, {
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [createUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { createUser: userData } }) {
      context.login(userData);
      navigation("/");
    },
    onError(err) {
      setErrors(JSON.parse(err.message.replace(/'/g, '"')));
    },
    variables: values,
  });

  function registerUser() {
    createUser();
  }

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox
            component="form"
            role="form"
            onSubmit={onSubmit}
            noValidate
            className={loading ? "loading" : ""}
          >
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Email"
                variant="standard"
                fullWidth
                value={values.email}
                error={!!errors.email}
                onChange={onChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                value={values.password}
                error={!!errors.password}
                onChange={onChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Confirm Password"
                variant="standard"
                fullWidth
                value={values.confirmPassword}
                error={!!errors.confirmPassword}
                onChange={onChange}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
