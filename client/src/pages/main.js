import React, { useContext, useEffect, useState } from 'react';
import TopBar from '../components/topbar';
import TopFilter from '../components/topfilter';
import axios from 'axios';
import Flight from '../components/flight';
import airportsData from '../assets/data/airports.json';
import RightFilter from '../components/rightfilter';
import { BuildingOfficeIcon, SunIcon } from '@heroicons/react/24/outline';
import { HelperContext } from '../helpers/HelperContext';

export default function Main() {
  const [flights, setFlights] = useState({mainList:[],filteredList:[]});
  const { filter, setFilter, rightPanelFilter, setRightPanelFilter } = useContext(HelperContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 1);

        const response = await axios.get("/public-flights/flights", {
          headers: {
            Accept: 'application/json',
            app_id: process.env.REACT_APP_APP_ID,
            app_key: process.env.REACT_APP_APP_KEY,
            ResourceVersion: "v4",
          },
          params: {
            includeDelays: false,
            sort: `+${rightPanelFilter.sortBy}`,
            fromDateTime: filter.date,
            route: filter.landingAirport,
          },
        });

        const updatedFlights = response.data.flights.map(a => {
          const asciiSum = Array.from(a.id).reduce((sum, char) => sum + char.charCodeAt(0), 0);
          const randomHour = asciiSum % 24; // 24 ile bölümünden kalan
          const randomMinute = asciiSum % 60; // 60 ile bölümünden kalan
          const landingTime = new Date(a.scheduleDateTime);
          landingTime.setHours(landingTime.getHours() + randomHour);
          landingTime.setMinutes(landingTime.getMinutes() + randomMinute);
          const price = Math.round((randomHour * 50) + (randomMinute * 50 / 60));

          return {
            ...a,
            departureAirport: filter.departureAirport,
            landingTime,
            price,
          };
        });

        setFlights((r)=>({...r,mainList:updatedFlights,filteredList:updatedFlights}))
      } catch (error) {
        console.error("Data fetching error:", error);
      }
    };

    fetchData();
  }, [filter, rightPanelFilter.sortBy]);
  useEffect(() => {
    const filteredFlights = flights.mainList.filter((a) => {
        const departureTime = new Date(a.scheduleDateTime);
        const hours = departureTime.getHours();

        // İlk durak sayısını kontrol et
        if (rightPanelFilter.stops === "0" && a.route.destinations.length === 1) {
            if (rightPanelFilter.departureTime === "option1" && hours >= 6 && hours < 18) {
                return a;
            } else if (rightPanelFilter.departureTime === "option2" && ((hours >= 18 && hours < 24) || (hours >= 0 && hours < 6))) {
                return a;
            }
        } 
        // İkinci durak sayısını kontrol et
        else if (rightPanelFilter.stops === "1" && a.route.destinations.length === 2) {
            if (rightPanelFilter.departureTime === "option1" && hours >= 6 && hours < 18) {
                return a;
            } else if (rightPanelFilter.departureTime === "option2" && ((hours >= 18 && hours < 24) || (hours >= 0 && hours < 6))) {
                return a;
            }
        } 
        // Üçüncü durak sayısını kontrol et
        else if (rightPanelFilter.stops === "2" && a.route.destinations.length > 2) {
            if (rightPanelFilter.departureTime === "option1" && hours >= 6 && hours < 18) {
                return a;
            } else if (rightPanelFilter.departureTime === "option2" && ((hours >= 18 && hours < 24) || (hours >= 0 && hours < 6))) {
                return a;
            }
        }
        return false; // Diğer durumlar için false döndür
    });

    console.log(filteredFlights); // Filtrelenmiş veriyi yazdır
    setFlights((r)=>({...r,filteredList:filteredFlights}))

}, [rightPanelFilter.stops, rightPanelFilter.departureTime,flights.mainList]);


  return (
    <div className='lg:h-dvh flex flex-col'>
      <TopBar />
      <div className='p-6 w-full h-full gap-6 flex max-xl:flex-col max-xl:pb-8 max-sm:px-2 '>
        <div className='gap-6 grid grid-rows-4 flex-grow'>
          <TopFilter />
          <div className='rounded row-span-3 grid grid-cols-4 gap-6 '>
            <div className='lg:col-span-3 max-lg:col-span-4 grid grid-rows-2 gap-6'>
              {flights.filteredList.slice(0, 2).map((data, i) => (
                <Flight key={i} data={data} />
              ))}
            </div>
            <RightFilter />
          </div>
        </div>
        <div className='gap-6 grid max-sm:grid-rows-3 max-sm:grid-cols-none max-xl:grid-cols-3  xl:grid-rows-3 lg:h-full'>
          <div className="rounded-xl items-center justify-center aspect-square h-auto w-full max-w-full max-h-full overflow-hidden relative">
            <img src={require("../assets/images/carRentals.png")} alt="Car Rentals" className='w-full h-full object-cover object-center absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2' />
            <div className="absolute inset-0 bg-orange-500 opacity-20"></div>
            <div className='absolute left-4 bottom-4 text-white'>
              <BuildingOfficeIcon className='size-10' />
              <h4 className='text-lg font-bold'>CAR RENTALS</h4>
            </div>
          </div>
          <div className="rounded-xl flex items-center justify-center aspect-square h-auto w-full max-w-full max-h-full overflow-hidden relative">
            <img src={require("../assets/images/hotels.png")} alt="Hotels" className='w-full h-full object-cover object-center absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2' />
            <div className="absolute inset-0 bg-blue-500 opacity-20"></div>
            <div className='absolute left-4 bottom-4 text-white'>
              <BuildingOfficeIcon className='size-10' />
              <h4 className='text-lg font-bold'>HOTELS</h4>
            </div>
          </div>
          <div className="rounded-xl flex items-center justify-center aspect-square h-auto w-full max-w-full max-h-full overflow-hidden relative">
            <img src={require("../assets/images/travelPackages.png")} alt="Travel Packages" className='w-full h-full object-cover object-center absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2' />
            <div className="absolute inset-0 bg-green-500 opacity-20"></div>
            <div className='absolute left-4 bottom-4 text-white'>
              <SunIcon className='size-10' />
              <h4 className='text-lg font-bold'>TRAVEL PACKAGES</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
