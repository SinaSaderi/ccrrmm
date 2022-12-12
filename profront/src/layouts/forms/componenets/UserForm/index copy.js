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

import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// eslint-disable-next-line import/no-unresolved
import FormRow from "layouts/forms/componenets/UserForm/FormRow";

import { gql, useMutation } from "@apollo/client";
import { useForm } from "util/hooks";

const REGISTER_USER = gql`
  mutation createUser(
    $group: String!
    $firstName: String!
    $lastName: String!
    $mobile: String!
    $address: String!
    $email: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    createUser(
      input: {
        group: $group
        firstName: $firstName
        lastName: $lastName
        mobile: $mobile
        addr: $address
        email: $email
        username: $username
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      ok
      token
      user {
        id
        email
      }
    }
  }
`;

function UserForm({ fields }) {
  const [errors, setErrors] = useState({});
  // const navigation = useNavigate();

  const formRows = fields;

  const fieldNames = {};
  for (let i = 0; i < formRows.length; i += 1) {
    for (let f = 0; f < formRows[i].length; f += 1) {
      fieldNames[formRows[i][f].name] = "";
    }
  }

  // eslint-disable-next-line no-use-before-define
  const { onBlur, onChange, onSubmit, values } = useForm(registerUser, fieldNames, setErrors);

  for (let i = 0; i < formRows.length; i += 1) {
    for (let f = 0; f < formRows[i].length; f += 1) {
      formRows[i][f].error = !!errors[formRows[i][f].name];
      formRows[i][f].value = values[formRows[i][f].name];
      formRows[i][f].onChange = onChange;
      formRows[i][f].onBlur = onBlur;
    }
  }

  const [createUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { createUser: userData } }) {
      console.log("userData ", userData);
      // navigation("/");
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
    <MDBox width="100%" pt={3} pb={3}>
      <MDTypography variant="h4">Manager information</MDTypography>
      <MDBox
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
        className={loading ? "loading" : ""}
      >
        {formRows.map((row) => (
          <FormRow row={row} key={row[0].name} />
        ))}
        <MDBox mt={4} mb={1}>
          <MDButton type="submit" variant="gradient" color="info" fullWidth>
            create manager
          </MDButton>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of UserForm
UserForm.defaultProps = {
  fields: [
    [
      { label: "Group", name: "group" },
      { label: "First name", name: "firstName" },
      { label: "Last name", name: "lastName" },
    ],
    [
      { label: "Username", name: "username" },
      { label: "Email", name: "email", type: "email" },
    ],
    [
      { label: "Mobile", name: "mobile" },
      { label: "Address", name: "address" },
    ],
    [
      { label: "Password", name: "password", type: "password" },
      {
        label: "Confirm Password",
        name: "confirmPassword",
        type: "password",
      },
    ],
  ],
};

// Typechecking props for the UserForm
UserForm.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.array),
};

export default UserForm;
