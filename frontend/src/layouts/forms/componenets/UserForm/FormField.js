/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

import MDBox from "components/MDBox";
import TextField from "@mui/material/TextField";

function FormField(props) {
  // console.log("propspropspropsprops", props);
  const { field, errors, touched, values, handleChange } = props;
  const dataProps = { ...props, ...field, errors, touched };
  // console.log(
  //   "field.name",
  //   field.name,
  //   "hasError",
  //   hasError,
  //   "Boolean(errors[field.name])",
  //   Boolean(errors[field.name])
  // );

  if (field.type === "hidden") {
    return (
      <TextField
        sx={{ display: "none" }}
        key={field.name}
        {...dataProps}
        value={values[field.name]}
        onChange={handleChange}
      />
    );
  }

  return (
    <MDBox width="100%" display="flex" flexDirection="row" pt={3} pl={3}>
      <TextField
        key={field.name}
        fullWidth
        variant="outlined"
        error={touched[field.name] && Boolean(errors[field.name])}
        helperText={Boolean(errors[field.name]) && errors[field.name]}
        {...dataProps}
        value={values[field.name]}
        onChange={handleChange}
      />
    </MDBox>
  );
}

FormField.defaultProps = {
  field: {},
};

FormField.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default FormField;
