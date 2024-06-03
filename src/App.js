import React, { useState } from 'react';
import './App.css';
import RequestPostalCode from './components/RequestPostalCode/RequestPostalCode';
import Map from './components/Map/Map';

function App() {
  const [coordinates, setCoordinates] = useState(null);

  const handleCoordinatesChange = (newCoordinates) => {
    setCoordinates(newCoordinates);
  };

  return (
    <div className="App">
      <Map coordinates={coordinates} />
      <RequestPostalCode onCoordinatesChange={handleCoordinatesChange} />
    </div>
  );
}

export default App;
