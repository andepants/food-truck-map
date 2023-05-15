"use client";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

function MapComponent() {

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if(!key){
    // you can throw error here and
    // let [Error Boundary](https://reactjs.org/docs/error-boundaries.html)
    // handle it
    // or return an component that says "Google Token is not set"
    throw new Error('Google token is not set');
  }

  return (
    <LoadScript googleMapsApiKey={key}>
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
