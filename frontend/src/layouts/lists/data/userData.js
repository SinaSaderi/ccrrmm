/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import * as React from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import ActionsButton from "components/Common/ActionsButton";

import Button from "@mui/material/Button";

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
    const relUsers = users[i].relatedUsers;
    const counts = {};
    const usertype = users[i].groups.length > 0 ? users[i].groups[0].name : "";

    relUsers.forEach((v) => {
      if (v.groups.length > 0) {
        if (counts[v.groups[0].name] !== undefined) {
          counts[v.groups[0].name] += 1;
        } else {
          counts[v.groups[0].name] = 1;
        }
      }
    }, {});

    // const [key, order] = entry;
    orderRows.push({
      full_name: <MDText text={`${users[i].firstName} ${users[i].lastName}`} />,
      username: (
        <MDTypography variant="string" color="text" fontWeight="medium">
          {users[i].username}
        </MDTypography>
      ),
      usertype: <Button>{usertype}</Button>,
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
      agents: <Button>{counts.agent ? counts.agent : 0} Agents</Button>,
      clients: <Button>{counts.client ? counts.client : 0} Clients</Button>,
      actions: <ActionsButton group="manager" />,
    });
  }
  return {
    columns: [
      { Header: "Full Name", accessor: "full_name", align: "left" },
      { Header: "Username", accessor: "username", align: "left" },
      { Header: "User Type", accessor: "usertype", align: "left" },
      { Header: "Email", accessor: "email", align: "center" },
      { Header: "Moile", accessor: "mobile", align: "center" },
      { Header: "Agents", accessor: "agents", align: "center" },
      { Header: "Clients", accessor: "clients", align: "center" },
      { Header: "Actions", accessor: "actions", align: "center" },
    ],

    rows: orderRows,
  };
}
