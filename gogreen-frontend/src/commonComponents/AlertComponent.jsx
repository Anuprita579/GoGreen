import React from "react";
//MUI Components
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";

function getTransitionComponent(transitionName) {
  switch (transitionName) {
    case "fade":
      return Fade;
    case "grow":
      return Grow;
    case "slide":
      return Slide;
    default:
      return Slide; // Default transition to Slide
  }
}

const AlertComponent = ({
  open,
  onClose,
  message,
  severity='info',
  variant='filled',
  autoHideDuration=4000,
  anchorOrigin={ vertical: "bottom", horizontal: "left"},
  transition='slide',
}) => {
  const Transition = getTransitionComponent(transition);

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      TransitionComponent={Transition}
      anchorOrigin={anchorOrigin}
    >
      <Alert variant={variant} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

AlertComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(["error", "warning", "info", "success"]),
  variant: PropTypes.oneOf(["filled", "outlined", "standard"]),
  autoHideDuration: PropTypes.number,
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(["top", "bottom"]),
    horizontal: PropTypes.oneOf(["left", "center", "right"]),
  }),
  transition: PropTypes.oneOf(["fade", "grow", "slide"]),
};

export default AlertComponent;
