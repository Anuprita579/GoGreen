import React from 'react';
import PropTypes from 'prop-types';
// MUI Components
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const LinearProgressComponent = ({ value, variant='determinate', className, style, minWidth, labelColor }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} className={className} style={style}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant={variant} value={value} />
      </Box>
      <Box sx={{ minWidth: minWidth || 35 }}>
        <Typography variant="body2" sx={{ color: labelColor || 'text.secondary' }}>
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

LinearProgressComponent.propTypes = {
  value: PropTypes.number.isRequired,     
  variant: PropTypes.string,               
  className: PropTypes.string,             
  style: PropTypes.object,                 
  minWidth: PropTypes.number,              
  labelColor: PropTypes.string,            
};

export default LinearProgressComponent;
