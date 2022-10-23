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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// eslint-disable-next-line import/no-named-as-default
// Graphql components
import { useQuery } from "@apollo/client";
import LoadingComponent from "components/LoadingComponent";
import ErrorComponent from "components/ErrorComponent";

import saleManagerData from "layouts/index/data/saleManagerData";
import agentData from "layouts/index/data/agentData";

import USERS_LIST from "layouts/index/Queries";

function Index({ group, title }) {
  const { data, loading, error } = useQuery(USERS_LIST, {
    variables: { group },
  });
  if (loading) {
    return <LoadingComponent />;
  }
  if (error) {
    return <ErrorComponent message="There was an error loading data" />;
  }

  const mydata = data;

  console.log("group", group);

  let cr = function () {};

  if (group === "manager") {
    cr = saleManagerData(mydata);
  } else if (group === "agent") {
    cr = agentData(mydata);
  }

  const { columns: uColumns, rows: uRows } = cr;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="secondary"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  {title}
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  // eslint-disable-next-line no-undef
                  table={{ columns: uColumns, rows: uRows }}
                  canSearch
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

Index.defaultProps = {
  group: "",
  title: "list",
};

Index.propTypes = {
  group: PropTypes.string,
  title: PropTypes.string,
};

export default Index;
