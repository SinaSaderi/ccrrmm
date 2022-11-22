/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { SnackbarProvider } from "notistack";

function Notify(props) {
  const providerRef = React.useRef();
  const location = useLocation();

  useEffect(() => {
    if (location.state !== null) {
      if (location.state.msg !== null) {
        providerRef.current.enqueueSnackbar(location.state.msg.text, {
          variant: location.state.msg.type,
        });
      }
    }
  }, [location.pathname]);
  return (
    <SnackbarProvider ref={providerRef} maxSnack={4} preventDuplicate>
      {props.children}
    </SnackbarProvider>
  );
}

export default Notify;
