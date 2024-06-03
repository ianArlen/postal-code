import React, { useState } from 'react';
import axios from 'axios';
import './RequestPostalCode.css';
import SearchPostalCode from '../SearchPostalCode/SearchPostalCode';
import DropdownStreet from '../DropdownStreets/DropdownStreets';
import ButtonPostalCode from '../ButtonPostalCode/ButtonPostalCode';

const RequestPostalCode = ({ onCoordinatesChange }) => {
  const [postalCode, setPostalCode] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedState, setSelectedState] = useState('Select Language');
  const [selectedColonia, setSelectedColonia] = useState('');

  const handlePostalCodeChange = (event) => {
    const value = event.target.value;
    setPostalCode(value);
    const isValidPostalCode = /^[0-9]{5}$/.test(value);
    setIsButtonVisible(isValidPostalCode);
    if (!isValidPostalCode) {
      setErrorMessage('El código postal debe tener 5 dígitos.');
    } else {
      setErrorMessage('');
    }
    setIsDropdownVisible(false);
  };

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setPostalCode(''); 
      setIsButtonVisible(false);
      setErrorMessage(''); 
      setIsDropdownVisible(false); 
      setDropdownOptions([]); 
      setSelectedColonia(''); 
    }
  };

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(`https://localhost:7181/api/Proxy/CatalogoCP?CP=${postalCode}`);
      const data = response.data.data;

      if (!data.colonias || !data.colonias.colonia || data.colonias.colonia.length === 0) {
        setErrorMessage('No hay respuesta para este código postal.');
        setIsDropdownVisible(false);
        return;
      }

      setSelectedState(data.descestado);
      const colonias = data.colonias.colonia;
      const coloniasArray = Array.isArray(colonias) ? colonias : [colonias];

      setDropdownOptions(coloniasArray);
      setIsDropdownVisible(true);
      setSelectedColonia('');

      const geocodeResponse = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${postalCode}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}&proximity=-99.1332,19.4326`);
      const coordinates = geocodeResponse.data.features[0].center;
      onCoordinatesChange({ lat: coordinates[1], lng: coordinates[0] });

    } catch (error) {
      console.error('Error fetching postal code data:', error);
      console.log('Error response:', error.response);
      if (error.response && error.response.status === 500) {
        if (error.response.data && error.response.data.message && error.response.data.message.includes("Cannot access child value on Newtonsoft.Json.Linq.JValue")) {
          setErrorMessage('ESTE COLONIA NO SE ENCUENTRA EN THONA');
        } else {
          setErrorMessage('Error del servidor: No se pudo procesar la solicitud.');
        }
      } else if (error.response && error.response.data && error.response.data.Message) {
        setErrorMessage(error.response.data.Message);
      } else {
        setErrorMessage('Ocurrió un error al buscar el código postal.');
      }
      setIsDropdownVisible(false);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedColonia(option);
  };

  return (
    <div className="search-container">
      <SearchPostalCode
        value={postalCode}
        onChange={handlePostalCodeChange}
        toggleSearch={toggleSearch}
        isExpanded={isExpanded}
      />
      {isButtonVisible && <ButtonPostalCode onClick={handleSearchClick} />}
      <div className="error-message">{errorMessage}</div>
      {isDropdownVisible && (
        <DropdownStreet options={dropdownOptions} selectedState={selectedState} onOptionSelect={handleOptionSelect} />
      )}
      {selectedColonia && isDropdownVisible && <h3 className="colonia-name">{selectedColonia}</h3>}
    </div>
  );
};

export default RequestPostalCode;