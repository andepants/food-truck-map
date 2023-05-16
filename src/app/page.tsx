"use client";
import { useEffect, useState } from "react";
import MapComponent from "../components/MapComponent";
const axios = require('axios').default;

export default function Home() {

  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([]);

  interface FoodTruck {
    address: string; applicant: string; footitems: string; latitude: string; longitude: string;
  }

  async function getFoodTrucks() {
    const key = process.env.NEXT_PUBLIC_DATASF_SECRET_KEY;
     if(!key){
       throw new Error('Google token is not <se></se>t');
     }

    const response = await fetch('https://data.sfgov.org/resource/rqzj-sfat.json')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setFoodTrucks(data);
    })
    .catch(error => {
      console.error(error);
    });
  }


  useEffect(() => {
    getFoodTrucks();
  }, []);

return (
    <div>
      <h3>Food Truck Map</h3>
      <MapComponent foodTrucks={foodTrucks}/>
    </div>
  );
}
