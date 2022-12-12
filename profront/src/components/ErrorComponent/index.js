import React from "react";
import { PropTypes } from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function ErrorComponent({ message }) {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Card>
            <MDBox p={2}>
              <MDTypography variant="h5">No Data</MDTypography>
            </MDBox>
            <MDBox p={2}>
              <MDTypography variant="h3">{message}</MDTypography>
            </MDBox>
          </Card>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

// const Container = styled.div`
//   width: 100%;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;

//   h1 {
//     padding: 1rem;
//     text-align: center;
//     font-weight: 500;
//   }

//   img {
//     width: 30%;
//     min-width: 250px;
//   }
// `;

export default ErrorComponent;

ErrorComponent.defaultProps = {
  message: "Error",
};

ErrorComponent.propTypes = {
  message: PropTypes.string,
};
