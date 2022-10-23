/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export default function datas(data) {
  const orderRows = [];

  const MDText = ({ text }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {text}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const { users } = data;
  for (let i = 0; i < users.length; i += 1) {
    // const [key, order] = entry;
    orderRows.push({
      full_name: <MDText text={`${users[i].firstName} ${users[i].lastName}`} />,
      username: (
        <MDTypography variant="string" color="text" fontWeight="medium">
          {users[i].username}
        </MDTypography>
      ),
      email: (
        <MDTypography variant="string" color="text" fontWeight="medium">
          {users[i].email}
        </MDTypography>
      ),
      mobile: (
        <MDTypography variant="string" color="text" fontWeight="medium">
          {users[i].mobile}
        </MDTypography>
      ),
    });
  }
  return {
    columns: [
      { Header: "Full Name", accessor: "full_name", align: "left" },
      { Header: "Username", accessor: "username", align: "left" },
      { Header: "Email", accessor: "email", align: "center" },
      { Header: "Moile", accessor: "mobile", align: "center" },
    ],

    rows: orderRows,
  };
}
