import React, { useState } from 'react';
//MUI Components
import { Autocomplete, TextField } from '@mui/material'
import PropTypes from 'prop-types';

const AutocompleteComponent = ({
  options,
  label,
  placeholder,
  value,
  onChange,
  getOptionLabel,
  renderInputProps,
  className,
  TextFieldStyle,
  ...props
}) => {
  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={onChange}
      getOptionLabel={getOptionLabel}
      className={className}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          className={TextFieldStyle}
          {...renderInputProps}
        />
      )}
      {...props}
    />
  );
};

AutocompleteComponent.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func,
  renderInputProps: PropTypes.object,
};

AutocompleteComponent.defaultProps = {
  getOptionLabel: (option) => option,
  renderInputProps: {},
};

export default AutocompleteComponent;