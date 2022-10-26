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

// @mui material components
// import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
// import typography from "assets/theme/base/typography";

function UserForm({ fields }) {
  console.log(fields);

  // const renderInputs = () => {
  //   const fieldset = [];
  //   fields.map((field, key) => (<div>{field}-{key}</div>));
  // };

  return (
    <MDBox width="100%" pt={3} pb={3}>
      <MDTypography variant="h4">Manager information</MDTypography>
      <MDBox component="form" autoComplete="off">
        <MDBox display="flex" flexDirection="row" ml={-3} mr={-3} width="calc(100% + 24px)">
          <MDBox width="100%" display="flex" flexDirection="row" pt={3} pl={3}>
            <TextField id="first-name" fullWidth label="First name" placeholder="First name" />
          </MDBox>
          <MDBox width="100%" display="flex" flexDirection="row" pt={3} pl={3}>
            <TextField id="last-name" fullWidth label="Last name" placeholder="Last name" />
          </MDBox>
        </MDBox>
        {/* <div>{renderInputs()}</div> */}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Form
UserForm.defaultProps = {
  fields: [
    { label: "First name", name: "firstName" },
    { label: "Last name", name: "lastName" },
    { label: "Mobile", name: "mobile" },
    { label: "Last name", name: "lastName" },
    { label: "Last name", name: "lastName" },
    { label: "Last name", name: "lastName" },
  ],
};

// Typechecking props for the Footer
UserForm.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object),
};

export default UserForm;
