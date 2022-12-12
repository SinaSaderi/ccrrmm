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

/* eslint-disable react/prop-types */
// prop-types is a library for typechecking of props

// @mui material components
import Button from "@mui/material/Button";

function RelatedUser({ relatedUsers, value }) {
  // console.log("key", key, "value", value);
  if (relatedUsers instanceof Array) {
    for (let i = 0; i < relatedUsers.length; i += 1) {
      if (relatedUsers[i].groups[0].name === value) {
        return (
          <Button id={`${value}-${relatedUsers[i].id}`}>
            {relatedUsers[i].firstName} {relatedUsers[i].lastName}
          </Button>
        );
      }
    }
  }
  return null;
}

export default RelatedUser;
