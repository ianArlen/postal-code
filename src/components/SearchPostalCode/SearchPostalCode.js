import React from 'react';
import './SearchPostalCode.css';

const SearchPostalCode = ({ value, onChange, toggleSearch, isExpanded }) => {
  return (
    <div className={`search ${isExpanded ? 'show-search' : ''}`} id="search-bar">
      <input
        type="text"
        className="search__input"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
      <button className="search__button" onClick={toggleSearch} id="search-button">
        <i className={`fas fa-search search__icon ${isExpanded ? 'hidden' : ''}`}></i>
        <i className={`fas fa-times search__close ${isExpanded ? '' : 'hidden'}`}></i>
      </button>
    </div>
  );
};

export default SearchPostalCode;
