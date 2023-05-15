"use client";
import React, { useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

function MapComponent() {

  return (
    <LoadScript googleMapsApiKey="AIzaSyDGWBgZcQRtqka5vHAk00X_AHm4C1gfA7g">
      <div id="map" className="h-400 w-full" />
      <GoogleMap
        mapContainerStyle={{width: '400px', height: '400px'}}
        center={{ lat: -3.745, lng: -38.523 }}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
