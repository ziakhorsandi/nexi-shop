import React from 'react';

function Input({ type, value, onChange, required }) {
  return (
    <input
      className='border shadow-sm rounded px-3 py-1 w-80'
      type={type}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}

export default Input;
