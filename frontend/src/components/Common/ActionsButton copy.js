/* eslint-disable react/self-closing-comp */
import { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

export default function ActionsButton({ group }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EditIcon color="success" fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ClearIcon color="error" fontSize="small" />
          </ListItemIcon>
          Remove
        </MenuItem>
        {group === "manager" && (
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SupportAgentIcon color="info" fontSize="small" />
            </ListItemIcon>
            Add Agent
          </MenuItem>
        )}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ContactPhoneIcon color="info" fontSize="small" />
          </ListItemIcon>
          Add Client
        </MenuItem>
      </Menu>
    </div>
  );
}

// Setting default values for the props of MDButton
ActionsButton.defaultProps = {
  group: "client",
};

// Typechecking props for the MDButton
ActionsButton.propTypes = {
  group: PropTypes.oneOf(["user", "manager", "agent", "client"]),
};
