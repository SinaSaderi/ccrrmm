import PropTypes from "prop-types";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

function FormField(props) {
  const { field } = props;
  const dataProps = { ...props, ...field };
  return (
    <MDBox width="100%" display="flex" flexDirection="row" pt={3} pl={3}>
      <MDInput {...dataProps} fullWidth />
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
