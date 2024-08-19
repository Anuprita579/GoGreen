import React from "react";
//Common Components
import Button from "./ButtonComponent";
//MUI Components
import Popover from "@mui/material/Popover";
import PropTypes from "prop-types";

function PopoverComponent({
  anchorEl,
  handleClick,
  handleClose,
  buttonContent,
  buttonId,
  popoverContent,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' }, //Default Props
  buttonClassName,
  popoverClassName,
}) {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClick}
        className={buttonClassName}
        id={buttonId}
        color="primary"
      >
        {buttonContent}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        className={popoverClassName}
      >
        {popoverContent}
      </Popover>
    </>
  );
}

PopoverComponent.propTypes = {
  // buttonText: PropTypes.string.isRequired,
  popoverContent: PropTypes.node.isRequired,
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(["top", "center", "bottom", "left", "right"]),
    horizontal: PropTypes.oneOf(["top", "center", "bottom", "left", "right"]),
  }),
};

export default PopoverComponent;
