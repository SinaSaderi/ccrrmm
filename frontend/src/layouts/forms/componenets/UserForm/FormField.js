/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

import MDBox from "components/MDBox";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { makeStyles } from "@mui/styles";

function FormField(props) {
  const useStyles = makeStyles({
    root: {
      "& .MuiSelect-select": {
        padding: "12px 12px 12px 32px !important",
      },
    },
  });
  const classes = useStyles(props);

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

  if (field.fiel_type === "select") {
    return (
      <MDBox width="100%" flexDirection="row" pt={2} pl={3}>
        <FormControl
          width="100%"
          flexDirection="row"
          pt={3}
          pl={3}
          fullWidth
          margin="dense"
          className={`${classes.root}`}
        >
          <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
          <Select
            style={{ paddingRight: "32px" }}
            labelId={`${field.id}-label`}
            {...dataProps}
            key={field.name}
            variant="outlined"
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={Boolean(errors[field.name]) && errors[field.name]}
            onChange={handleChange}
            value={values[field.name]}
          >
            {field.items.map((item) => (
              <MenuItem value={item.value}>{item.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </MDBox>
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
