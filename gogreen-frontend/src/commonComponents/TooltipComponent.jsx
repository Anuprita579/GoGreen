import React from "react";
//Common Components
import ButtonComponent from "./Button";
//MUI Components
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";

const TooltipComponent = ({
  title,
  onClick,
  children,
  className,
  style,
  backgroundColor,
  color,
  disabled=false,
  placement='bottom',
}) => {
  return (
    <Tooltip
      title={title}
      placement={placement}
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: { backgroundColor },
            color: { color },
          },
        },
      }}
    >
      <span>
        <ButtonComponent
          onClick={onClick}
          className={className}
          style={style}
          disabled={disabled}
          children={children}
        />
      </span>
    </Tooltip>
  );
};

TooltipComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  placement: PropTypes.oneOf(["top", "right", "bottom", "left"]),
};

export default TooltipComponent;
