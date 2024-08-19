import React from 'react';
//MUI Components
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const InputFieldComponent = ({
  label,
  value,
  onChange,
  variant='standard',
  fullWidth=false,
  margin='normal',
  size='medium',
  type='text',
  disabled=false,
  error=false,
  helperText,
}) => {
  const textFieldProps = {
    label,
    variant,
    fullWidth,
    margin,
    size,
    type,
    disabled,
    error,
    helperText,
  };

  if (value !== undefined) {
    textFieldProps.value = value;
    textFieldProps.onChange = onChange;
  }

  return <TextField {...textFieldProps} />;
};

InputFieldComponent.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  fullWidth: PropTypes.bool,
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default InputFieldComponent;