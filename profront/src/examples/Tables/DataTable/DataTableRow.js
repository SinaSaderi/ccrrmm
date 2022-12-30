import { withStyles } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
    transition: "all 0.3s",
    "&.fade-out": {
      opacity: 0,
      transform: "translateY(-20px)",
    },
  },
}))(TableRow);

export default StyledTableRow;
