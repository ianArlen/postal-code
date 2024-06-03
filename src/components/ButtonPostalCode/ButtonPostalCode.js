import React from 'react';
import './ButtonPostalCode.css';

const ButtonPostalCode = ({ onClick }) => {
  return (
    <div className="button-container">
      <button className="btn" onClick={onClick}>Search</button>
    </div>
  );
};

export default ButtonPostalCode;
