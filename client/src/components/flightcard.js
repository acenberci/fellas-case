import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export default function FlightCard({ data }) {
    const [airline, setAirline] = useState(null);
    const [seatAvailability, setSeatAvailability] = useState({
        economy: false,
        premiumEconomy: false,
        business: false,
        first: false,
        suite: false
    });

    const { flightName = "", prefixIATA, prefixICAO, scheduleDateTime, landingTime, price, route, departureAirport } = data;

    const flightDuration = useMemo(() => {
        const departure = new Date(scheduleDateTime);
        const landing = new Date(landingTime);
        const diffInMs = Math.abs(landing - departure);
        const hours = Math.floor(diffInMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        return `${hours}h ${minutes}m`;
    }, [scheduleDateTime, landingTime]);

    const fetchAirlineData = async (code, type) => {
        try {
            const response = await axios.get(`/public-flights/airlines/${code}`, {
                headers: {
                    Accept: 'application/json',
                    app_id: process.env.REACT_APP_APP_ID,
                    app_key: process.env.REACT_APP_APP_KEY,
                    ResourceVersion: "v4",
                }
            });
            setAirline(response.data);
        } catch (error) {
            console.error(`Hata (${type}):`, error);
        }
    };

    const calculateSeatAvailability = useMemo(() => {
        const firstFiveChars = flightName.slice(0, 5);
        return {
            economy: firstFiveChars.length > 0 && firstFiveChars.charCodeAt(0) % 2 === 0,
            premiumEconomy: firstFiveChars.length > 1 && firstFiveChars.charCodeAt(1) % 2 === 0,
            business: firstFiveChars.length > 2 && firstFiveChars.charCodeAt(2) % 2 === 0,
            first: firstFiveChars.length > 3 && firstFiveChars.charCodeAt(3) % 2 === 0,
            suite: firstFiveChars.length > 4 && firstFiveChars.charCodeAt(4) % 2 === 0,
        };
    }, [flightName]);

    useEffect(() => {
        if (prefixIATA) fetchAirlineData(prefixIATA, 'IATA');
        else if (prefixICAO) fetchAirlineData(prefixICAO, 'ICAO');
    }, [prefixIATA, prefixICAO]);

    useEffect(() => {
        setSeatAvailability(calculateSeatAvailability);
    }, [calculateSeatAvailability]);

    return (
        <div className='w-full px-4 py-8 flex max-lg:flex-col justify-between bg-white shadow-sm border rounded-sm max-lg:gap-4'>
            <div className='size-6 border rounded-full bg-blue-500 mr-4'></div>
            <div className='flex flex-col justify-between flex-grow'>
                <div>
                    {new Date(scheduleDateTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                    - {new Date(landingTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                </div>
                <div className='grid grid-cols-3 gap-10'>
                    <div className='flex flex-col gap-1'>
                        <h4 className='text-xs font-semibold'>{airline ? airline.publicName : "Unknown"}</h4>
                        <button className='flex items-center text-blue-500 gap-1 text-xs font-semibold'>
                            Flight Details
                            <ChevronDownIcon className='size-3' />
                        </button>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h4 className='text-xs font-semibold'>{route.destinations.length <= 1 ? "Nonstop" : `${route.destinations.length} stops`}</h4>
                        <h4 className='text-xs font-semibold opacity-50'>{flightDuration}</h4>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h4 className='text-xs font-semibold'>{departureAirport} to {route.destinations[0]}</h4>
                        <h4 className='text-xs font-semibold opacity-50'>{flightName}</h4>
                    </div>
                </div>
            </div>
            <div className='flex max-lg:justify-between gap-2'>
                {['economy', 'premiumEconomy', 'business', 'first', 'suite'].map((seatClass, index) => {
                    const seatAvailable = seatAvailability[seatClass];
                    const seatPriceMultipliers = [1, 1.75, 3.5, 7.5, 15];
                    const seatLabel = ['Eco', 'Eco+', 'Business', 'First', 'Suite'];

                    return (
                        <button key={seatClass} className={`w-24 ${seatAvailable ? "bg-white hover:scale-110 hover:brightness-95" : "bg-gray-200"} aspect-[5/6] rounded-lg border p-4 `}>
                            {seatAvailable ? (
                                <div className='flex flex-col justify-between items-center h-full'>
                                    <h4 className='text-sm font-bold'>${Math.round(price * seatPriceMultipliers[index])}</h4>
                                    <h4 className='text-[10px]'>{seatLabel[index]}</h4>
                                </div>
                            ) : (
                                <div className='h-full w-full flex justify-center items-center font-bold text-gray-300'>
                                    <h4>●●●</h4>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
