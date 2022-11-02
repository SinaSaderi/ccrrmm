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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React base styles
// import typography from "assets/theme/base/typography";

function FormField({ field }) {
  return (
    <MDBox width="100%" display="flex" flexDirection="row" pt={3} pl={3}>
      <MDInput {...field} fullWidth />
    </MDBox>
  );
}

FormField.defaultProps = {
  field: {},
};

FormField.propTypes = {
  field: PropTypes.arrayOf(PropTypes.object),
};

function FormRow({ row }) {
  return (
    <MDBox display="flex" flexDirection="row" ml={-3} mr={-3} width="calc(100% + 24px)">
      {row.map((field) => (
        <FormField field={field} />
      ))}
    </MDBox>
  );
}

// Setting default values for the props of FormRow
FormRow.defaultProps = {
  row: [],
};

// Typechecking props for the FormRow
FormRow.propTypes = {
  row: PropTypes.arrayOf(PropTypes.object),
};

function UserForm({ fields }) {
  console.log("fields", fields);
  // for (let i = 0; i < fields.length; i += 1) {
  //   for (let i = 0; i < fields[i].length; i += 1) {

  //   }
  // }
  return (
    <MDBox width="100%" pt={3} pb={3}>
      <MDTypography variant="h4">Manager information</MDTypography>
      <MDBox component="form" autoComplete="off">
        {fields.map((row) => (
          <FormRow row={row} />
        ))}
      </MDBox>
      <MDBox mt={4} mb={1}>
        <MDButton type="submit" variant="gradient" color="info" fullWidth>
          create manager
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of UserForm
UserForm.defaultProps = {
  fields: [
    [
      { label: "First name", name: "firstName", id: "firstName" },
      { label: "Last name", name: "lastName", id: "lastName" },
    ],
    [
      { label: "Username", name: "username", id: "username" },
      { label: "Email", name: "email", id: "email" },
    ],
    [
      { label: "Mobile", name: "mobile", id: "mobile" },
      { label: "Address", name: "address", id: "address" },
    ],
    [
      { label: "Password", name: "passwd", id: "passwd", type: "password" },
      {
        id: "conf_passwd",
        label: "Confirm password",
        name: "conf_passwd",
        type: "password",
      },
    ],
  ],
};

// Typechecking props for the UserForm
UserForm.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object),
};

export default UserForm;
