import React, { useState, useEffect } from 'react';
import './DropdownStreet.css';

const DropdownStreet = ({ options, selectedState, onOptionSelect }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selectedState);
  const [listHeight, setListHeight] = useState('0');

  useEffect(() => {
    const maxVisibleOptions = 5; 
    const optionHeight = 36; 
    const visibleOptions = Math.min(options.length, maxVisibleOptions);
    setListHeight(`${visibleOptions * optionHeight}px`);
  }, [options]);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.descripcion_colonia);
    setIsActive(false);
    onOptionSelect(`${option.codigo_colonia}.- ${option.descripcion_colonia}`);
  };

  return (
    <div className="select-menu">
      <div className="select" onClick={toggleDropdown}>
        <span>{selectedOption}</span>
        <i className={`fas ${isActive ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
      </div>
      <div
        className={`options-list ${isActive ? 'active' : ''}`}
        style={{ maxHeight: isActive ? listHeight : '0' }}
      >
        {options.map((option) => (
          <div
            key={option.codigo_colonia}
            className={`option ${selectedOption === option.descripcion_colonia ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option.descripcion_colonia}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownStreet;
