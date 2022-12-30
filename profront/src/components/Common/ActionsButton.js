import * as React from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ClearIcon from "@mui/icons-material/Clear";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PropTypes from "prop-types";
import { useDeleteUserMutation } from "graphql/queries/user/mutation";
import { USERS_LIST } from "graphql/queries/user/queries";
import { Link } from "react-router-dom";
import StyledMenu from "./StyledMenui";

export default function ActionsButton({ group, pk }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { deleteUser } = useDeleteUserMutation();

  async function deleteEventHandler() {
    try {
      await deleteUser({
        variables: { id: pk },
        refetchQueries: [{ query: USERS_LIST, variables: { group: "agent" } }],
      });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ color: "#FFFFFF" }}
      >
        {group} Actions
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem component={Link} onClick={handleClose} disableRipple to={`edit/${pk}`}>
          <EditIcon color="warning" />
          Edit
        </MenuItem>
        <MenuItem onClick={() => deleteEventHandler(pk)} disableRipple>
          <ClearIcon color="error" />
          Delete
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <SupportAgentIcon color="info" />
          Assign Agent
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <ContactPhoneIcon color="success" />
          Assign Client
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

// Setting default values for the props of MDButton
ActionsButton.defaultProps = {
  group: "client",
  pk: null,
};

// Typechecking props for the MDButton
ActionsButton.propTypes = {
  group: PropTypes.oneOf(["user", "manager", "agent", "client"]),
  pk: PropTypes.string,
};
