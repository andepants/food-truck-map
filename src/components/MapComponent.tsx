"use client";
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

function MapComponent({ foodTrucks } : { foodTrucks: Array<object> }) {

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if(!key){
    throw new Error('Google token is not set');
  }

  return (
    <>
      <div className="dropdown flex justify-center m-10">
        <label tabIndex={0} className="btn m-1">Select Neighborhood</label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </div>
      <LoadScript googleMapsApiKey={key}>
        <GoogleMap
          mapContainerStyle={{width: '100%', height: '500px'}}
          center={{ lat: 37.77632714778992, lng: -122.39179682107691 }}
          zoom={10}
        >
          {foodTrucks?.map((foodTruck : any, index: number) => {
          return (
            <MarkerF
              key={index}
              position={{ lat : Number(foodTruck.latitude), lng: Number(foodTruck.longitude) }}
              title={foodTruck.applicant}
            />
          );
        })}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default MapComponent;
