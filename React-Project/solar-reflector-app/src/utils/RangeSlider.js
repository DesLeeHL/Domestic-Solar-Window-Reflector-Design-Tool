// import React from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const RangeSlider = ({ label, id, min, max, value, onChange, unit }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type='range'
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}
      />
      <span>
        {parseFloat(value).toFixed(2)}{unit}
      </span>
      {/* <Box sx={{ width: 200 }}>
        <Typography id="input-slider" gutterBottom>
          {label}
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Slider
            aria-label="Volume"
            value={value}
            onChange={onChange}
            valueLabelDisplay="on"
            getAriaValueText={`${value}${unit}`}
          />
        </Stack>
        <Slider disabled defaultValue={30} aria-label="Disabled slider" />
      </Box> */}
    </div>

  );
};

export default RangeSlider;