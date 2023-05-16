"use client";
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { sfNeighbordhoods, Neighborhood } from '../../public/sfNeighborhoods';

interface FoodTruck {
  address: string;
  applicant: string;
  footitems: string;
  latitude: string;
  longitude: string;
  status: string;
  fooditems: string;
}

function MapComponent({ foodTrucks } : { foodTrucks: Array<object> }) {

  const [ selected, setSelected ] = useState<string>('Select  Neighborhood');
  const [ selectedNeighborhood, setSelectedNeighborhood ] = useState<object>({ lat: 37.77632714778992, lng: -122.39179682107691 });
  const [ mapZoom, setMapZoom ] = useState<number>(12);
  const [ dropDownOpen, setDropDownOpen ] = useState<boolean>(false);
  const [ selectedFoodTruck, setSelectedFoodTruck ] = useState<FoodTruck | null>(null);
  const [ modalOpen, setModalOpen ] = useState<boolean>(false);

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if(!key){
    throw new Error('Google token is not set');
  }

  const handleClick = (event: any) => {
    const selectedNeighborhoodCoordinates = {lat: Number(event.target.dataset.latitude), lng: Number(event.target.dataset.longitude)};
    setSelected(event.target.innerText);
    setSelectedNeighborhood(selectedNeighborhoodCoordinates);
    setDropDownOpen(false);
    setMapZoom(15);
  }

   const handleFoodTruckClick = (foodTruck : FoodTruck) => {
    if (foodTruck !== selectedFoodTruck) {
      setSelectedFoodTruck(foodTruck);
    } else {
      setModalOpen(true);
    }
  }

  useEffect(() => {
    if (selectedFoodTruck) {
      setModalOpen(true);
    }
  }, [selectedFoodTruck]);

  return (
    <>
      <div className="dropdown flex justify-center m-10">
        <label tabIndex={0} onClick={() => setDropDownOpen(!dropDownOpen)} className="btn m-1">{selected}</label>
        {dropDownOpen && (
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            {sfNeighbordhoods.map((neighborhood : Neighborhood, index: number) => {
              return <li onClick={handleClick} data-longitude={neighborhood.longitude} data-latitude={neighborhood.latitude} key={index}>{neighborhood.neighborhood}</li>
            })}
        </ul>
        )}
      </div>
      <LoadScript googleMapsApiKey={key}>
        <GoogleMap
          mapContainerStyle={{width: '100%', height: '500px'}}
          center={selectedNeighborhood as any}
          zoom={mapZoom}
        >
          {foodTrucks?.map((foodTruck : any, index: number) => {
          return (
            <MarkerF
              key={index}
              title={foodTruck.applicant}
              position={{ lat : Number(foodTruck.latitude), lng: Number(foodTruck.longitude) }}
              clickable={true}
              onClick={() => handleFoodTruckClick(foodTruck)}
            />
          );
        })}
        </GoogleMap>
      </LoadScript>
      {modalOpen && (
        <div>
          <div className="modal modal-open modal-bottom sm:modal-middle">
          <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <div className="modal-box">
              <label onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
              <h3 className="font-bold text-lg">{selectedFoodTruck?.applicant}</h3>
              <p className="py-1 underline">Address</p>
              <p className="pb-3">{selectedFoodTruck?.address}</p>
              <p className="py-1 underline">Type of Food</p>
              <p className="pb-4">{selectedFoodTruck?.fooditems}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MapComponent;
