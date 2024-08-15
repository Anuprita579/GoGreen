import React from 'react';
//MUI Components
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const ButtonComponent = ({ onClick, children, variant, color, className, style, type, disabled, id }) => {
  return (
    <Button variant={variant} color={color} onClick={onClick} id={id} className={className} style={style} type={type} disabled={disabled} >
      {children}
    </Button>
  );
};

ButtonComponent.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string
};

export default ButtonComponent;