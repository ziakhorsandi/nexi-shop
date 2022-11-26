import React from 'react';

function Button({ type, onClick, children }) {
  return (
    <button
      className='bg-green-800 text-gray-100 hover:bg-green-700 
       rounded px-4 py-2 my-2'
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
