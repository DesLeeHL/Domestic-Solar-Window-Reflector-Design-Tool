// import React from 'react';
import * as React from 'react';

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
    </div>

  );
};

export default RangeSlider;