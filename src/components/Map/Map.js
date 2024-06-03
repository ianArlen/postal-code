import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

const Map = ({ coordinates }) => {
  const [viewport, setViewport] = useState({
    latitude: 19.4326,  // Coordenadas iniciales (CDMX)
    longitude:-99.1332,
    zoom: 6,
    width: '100%',
    height: '100%'
  });

  useEffect(() => {
    if (coordinates) {
      setViewport(prevViewport => ({
        ...prevViewport,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        zoom: 10 
      }));
    }
  }, [coordinates]);

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/ianecm/clwz0w8ud06nr01nx6chkg86h" 
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
        onViewportChange={(newViewport) => setViewport(newViewport)}
      >
        {coordinates && (
          <Marker latitude={coordinates.lat} longitude={coordinates.lng}>
            <div style={{ color: 'red', fontSize: '24px' }}>📍</div>
          </Marker>
        )}
      </ReactMapGL>
    </div>
  );
};

export default Map;
