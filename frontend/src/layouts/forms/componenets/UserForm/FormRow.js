import PropTypes from "prop-types";
import MDBox from "components/MDBox";

import FormField from "layouts/forms/componenets/UserForm/FormField";
import React from "react";

function FormRow({ row }, props) {
  return (
    <MDBox display="flex" flexDirection="row" ml={-3} mr={-3} width="calc(100% + 24px)">
      {row.map((field) => (
        <FormField key={field.name} field={field} {...props} />
      ))}
    </MDBox>
  );
}

// Setting default values for the props of FormRow
FormRow.defaultProps = {
  row: {},
  // errors: [],
  // handleBlur: PropTypes.func,
  // handleChange: PropTypes.func,
  // setFieldValue: PropTypes.func,
  // isSubmitting: "false",
  // isValid: "false",
  // touched: false,
  // dirty: React.bool,
  // values: [],
};

// Typechecking props for the FormRow
FormRow.propTypes = {
  row: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // handleBlur: PropTypes.func,
  // handleChange: PropTypes.func,
  // setFieldValue: PropTypes.func,
  // isSubmitting: PropTypes.bool,
  // isValid: PropTypes.bool,
  // dirty: PropTypes.bool,
  // touched: PropTypes.oneOf([true, false]),
  // values: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default FormRow;
