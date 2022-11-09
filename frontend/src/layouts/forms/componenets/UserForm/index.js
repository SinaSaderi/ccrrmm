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
import { modules } from "util/modules";

import REGISTER_USER from "layouts/forms/Queries";

function UserForm({ fields, group }) {
  // const navigation = useNavigate();
  const formRows = fields;

  const initialValues = {};
  const validations = {};
  for (let i = 0; i < formRows.length; i += 1) {
    for (let f = 0; f < formRows[i].length; f += 1) {
      initialValues[formRows[i][f].name] =
        formRows[i][f].defaultValue !== undefined
          ? formRows[i][f].defaultValue
          : "";
      if (formRows[i][f].validation !== undefined) {
        validations[formRows[i][f].name] = formRows[i][f].validation;
      }
    }
  }

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

  const ref = useRef(null);
  console.log("ref", ref);
  return (
    <Formik
      initialValues={{
        ...initialValues,
      }}
      validationSchema={Yup.object().shape(validations)}
      onSubmit={(values) => {
        console.log("aaaaa", JSON.stringify(values));
        createUser({
          variables: values,
        });
      }}
    >
      {({ isValid, handleSubmit, errors, touched, ...props }) => (
        <MDBox width="100%" pt={3} pb={3}>
          <MDTypography variant="h4" sx={{ textTransform: "capitalize" }}>
            {group} information
          </MDTypography>
          <MDBox
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
            className={loading ? "loading" : ""}
            isValidating
          >
            {formRows.map((row) => (
              <FormRow
                key={row[0].name}
                row={row}
                errors={errors}
                touched={touched}
                {...props}
              />
            ))}
            <MDBox mt={4} mb={1}>
              <MDButton
                type="submit"
                variant="gradient"
                color={modules[group].class}
                fullWidth
                // disabled={Boolean(!isValid)}
              >
                create {group}
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
  fields: [],
  group: "",
};

// Typechecking props for the UserForm
UserForm.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.array),
  group: PropTypes.string,
};

export default UserForm;
