import * as React from "react";

// import PropTypes from "prop-types";
// import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

// import classNames from "classnames";

export default function Loading() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // const useStyles = makeStyles({
  //   root: {
  //     background: "#FFF",
  //   },
  //   on: {
  //     display: "block",
  //   },
  //   off: {
  //     display: "block",
  //     background: "#FFF",
  //   },
  // });
  // // eslint-disable-next-line no-unused-vars
  // const classes = useStyles();

  return (
    // <div className={classNames(classes.root, classes.on)}>
    //   ssssssss{isLoading}
    // </div>
    <Box sx={{ width: "100%", position: "fixed", top: "0", left: "0" }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}

// Setting default values for the props of MDButton
// Loading.defaultProps = {
//   isLoading: false,
// };

// // Typechecking props for the MDButton
// Loading.propTypes = {
//   isLoading: PropTypes.bool,
// };
