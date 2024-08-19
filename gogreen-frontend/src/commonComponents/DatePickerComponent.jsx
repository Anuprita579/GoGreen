import React from 'react';
//MUI Components
import DatePicker from '@mui/lab/DatePicker';

const DatePickerComponent = ({ 
  label, 
  value, 
  onChange 
}) => {
  return (
      <DatePicker
        label={label}
        value={value}
        onChange={(newValue) => {
          onChange(newValue);
        }}
        renderInput={(params) => <input {...params} />}
      />
  );
};

export default DatePickerComponent;