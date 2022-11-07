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

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDInput
import MDInputRoot from "components/MDInput/MDInputRoot";

const MDInput = forwardRef(({ error, success, disabled, ...rest }, ref) => {
  const aErrors = rest.errors;
  let myError = error;

  if (rest.field !== undefined && rest.errors !== undefined) {
    const aField = rest.field;
    Object.entries(aErrors).forEach((value) => {
      if (aField.name === value) {
        myError = true;
      } else {
        myError = false;
      }
    });
    // console.log("myError", myError);
    // for (const r in rest.errors) {
    //   console.log("rrrrr", r);
    // }
    // rest.errors.map((er) => {
    //   return null;
    // });
    // for (let i = 0; i < rest.errors.length; i += 1) {
    //   console.log("iiiii", rest.errors[i]);
    //   // if (rest.field.name in rest.errors) {
    //   //   console.log("restrest", rest.field, rest.errors);
    //   // }
    // }
  }
  // eslint-disable-next-line prettier/prettier
  return(<MDInputRoot {...rest} ref={ref} ownerState={{ error: myError, success, disabled }} />);
});

// Setting default values for the props of MDInput
MDInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the MDInput
MDInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default MDInput;
