"use client";
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

function MapComponent({ foodTrucks } : { foodTrucks: Array<object> }) {

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if(!key){
    throw new Error('Google token is not set');
  }

  return (
    <>
      <LoadScript googleMapsApiKey={key}>
        <GoogleMap
          mapContainerStyle={{width: '400px', height: '400px'}}
          center={{ lat: 37.77632714778992, lng: -122.39179682107691 }}
          zoom={10}
        >
          {foodTrucks?.map((foodTruck : any, index: number) => {
          return (
            <MarkerF
              key={index}
              position={{ lat : Number(foodTruck.latitude), lng: Number(foodTruck.longitude) }}
            />
          );
        })}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default MapComponent;
