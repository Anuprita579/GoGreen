import React from 'react';
//MUI Components
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel  from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

const SelectComponent = ({ value, onChange, label, options, helperText, className, labelClassName }) => {
  return (
    <FormControl className={className}>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
      {label && <InputLabel className={labelClassName}>{label}</InputLabel>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

SelectComponent.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  helperText: PropTypes.string,
  className: PropTypes.string
};

SelectComponent.defaultProps = {
  value: '',
  onChange: () => {},
  label: '',
  helperText: '',
  className: ''
};

export default SelectComponent;