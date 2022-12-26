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

    relUsers.forEach((v) => {
      if (counts[v.groups[0].name] !== undefined) {
        counts[v.groups[0].name] += 1;
      } else {
        counts[v.groups[0].name] = 1;
      }
    }, {});

    // const [key, order] = entry;
    orderRows.push({
      full_name: `${users[i].firstName} ${users[i].lastName}`,
      username: users[i].username,
      email: users[i].email,
      mobile: users[i].mobile,
      agents: <Button name="agent_text">{counts.agent ? counts.agent : 0} Agents</Button>,
      clients: <Button>{counts.client ? counts.client : 0} Clients</Button>,
      actions: <ActionsButton group="manager" pk={users[i].id} />,
    });
  }
  return {
    columns: [
      {
        Header: "Full Name",
        accessor: "full_name",
        Cell: ({ cell: { value } }) => <MDText name="full_name_text" text={value} />,
        align: "left",
      },
      {
        Header: "Username",
        accessor: "username",
        Cell: ({ cell: { value } }) => (
          <MDTypography variant="string" color="text" fontWeight="medium">
            {value}
          </MDTypography>
        ),
        align: "left",
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({ cell: { value } }) => (
          <MDTypography variant="string" color="text" fontWeight="medium">
            {value}
          </MDTypography>
        ),
        align: "center",
      },
      {
        Header: "Moile",
        accessor: "mobile",
        Cell: ({ cell: { value } }) => (
          <MDTypography variant="string" color="text" fontWeight="medium">
            {value}
          </MDTypography>
        ),
        align: "center",
      },
      { Header: "Agents", accessor: "agents", align: "center" },
      { Header: "Clients", accessor: "clients", align: "center" },
      { Header: "Actions", accessor: "actions", align: "center" },
    ],

    rows: orderRows,
  };
}
