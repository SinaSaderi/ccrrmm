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

import React, { useRef } from "react";
// import { useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import * as Yup from "yup";
import { Formik } from "formik";

// eslint-disable-next-line import/no-unresolved
import FormRow from "layouts/forms/componenets/UserForm/FormRow";

import { useMutation } from "@apollo/client";

import REGISTER_USER from "layouts/forms/Queries";

function UserForm({ fields }) {
  // const [errors, setErrors] = useState({});
  // const navigation = useNavigate();
  const formRows = fields;

  const initialValues = {};
  for (let i = 0; i < formRows.length; i += 1) {
    for (let f = 0; f < formRows[i].length; f += 1) {
      initialValues[formRows[i][f].name] = "";
    }
  }

  // eslint-disable-next-line no-use-before-define
  // const { onChange, onSubmit, values } = useForm(registerUser, initialValues, setErrors);

  // for (let i = 0; i < formRows.length; i += 1) {
  //   for (let f = 0; f < formRows[i].length; f += 1) {
  //     // formRows[i][f].error = !!errors[formRows[i][f].name];
  //     // formRows[i][f].value = values[formRows[i][f].name];
  //     // formRows[i][f].onChange = onChange;
  //   }
  // }

  const [createUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { createUser: userData } }) {
      console.log("userData ", userData);
      // navigation("/");
    },
    onError(err) {
      console.log(err);
      // setErrors(JSON.parse(err.message.replace(/'/g, '"')));
    },
  });

  // function registerUser() {
  //   createUser();
  // }

  const ref = useRef(null);
  console.log(ref);
  return (
    <Formik
      initialValues={{
        ...initialValues,
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required("firstName is required"),
      })}
      onSubmit={(values) => {
        console.log("aaaaa", JSON.stringify(values));
        createUser({
          variables: {
            orderData: JSON.stringify(values).replace(/"/g, "\\'"),
          },
        });
      }}
    >
      {({ isValid, handleSubmit }, props) => (
        <MDBox width="100%" pt={3} pb={3}>
          <MDTypography variant="h4">Manager information</MDTypography>
          <MDBox
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
            className={loading ? "loading" : ""}
          >
            {formRows.map((row) => (
              <FormRow key={row[0].name} row={row} {...props} />
            ))}
            <MDBox mt={4} mb={1}>
              <MDButton
                type="submit"
                variant="gradient"
                color="info"
                fullWidth
                disabled={Boolean(!isValid)}
              >
                create manager
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      )}
    </Formik>
  );
}

// Setting default values for the props of UserForm
UserForm.defaultProps = {
  fields: [
    [
      { label: "Group", name: "group" },
      { label: "First name", name: "firstName", id: "firstName" },
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
