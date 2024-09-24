import React, { useState, useEffect } from 'react';
import airportsData from '../assets/data/airports.json';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Flight(props) {
    const [airline, setAirline] = useState(null);
    const [loading, setLoading] = useState(0);
    const navigate = useNavigate();
    const destination = airportsData.find(a => a.iata_code === props.data.route.destinations[0]);
    const departure = airportsData.find(a => a.iata_code === props.data.departureAirport);
    const departureTime = new Date(props.data.scheduleDateTime);
    const landingTime = new Date(props.data.landingTime);
    const differenceInMs = Math.abs(landingTime - departureTime);
    const hour = Math.floor(differenceInMs / (1000 * 60 * 60));
    const minute = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));
    const formattedMinute = minute.toString().padStart(2, '0');

    useEffect(() => {
        const fetchAirlineData = async () => {
            try {
                const response = await axios.get(`/public-flights/airlines/${props.data.prefixIATA}`, {
                    headers: {
                        Accept: 'application/json',
                        app_id: process.env.REACT_APP_APP_ID,
                        app_key: process.env.REACT_APP_APP_KEY,
                        ResourceVersion: "v4",
                    }
                });
                setAirline(response.data);
            } catch {
                try {
                    const res = await axios.get(`/public-flights/airlines/${props.data.prefixICAO}`, {
                        headers: {
                            Accept: 'application/json',
                            app_id: process.env.REACT_APP_APP_ID,
                            app_key: process.env.REACT_APP_APP_KEY,
                            ResourceVersion: "v4",
                        }
                    });
                    setAirline(res.data);
                } catch (error) {
                    console.error("Hata:", error);
                }
            }
        };

        const checkIfAlreadyBooked = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/flights/getFlights`);
                const alreadyBooked = response.data.some(flight => flight.id === props.data.id && props.data.departureAirport === flight.departureAirport);
                setLoading(alreadyBooked ? 4 : 0);
            } catch (error) {
                console.error("Hata:", error);
            }
        };

        fetchAirlineData();
        checkIfAlreadyBooked();
    }, [props.data.prefixIATA, props.data.prefixICAO, props.data.id]);

    const bookFlight = async () => {
        try {
            setLoading(1);
            const response = await axios.post(`http://localhost:3001/flights/setFlight`, props.data);
            setLoading(response.data.error ? 2 : 3);
            setTimeout(() => {
                navigate('/myflights');
              }, 500)
        } catch (error) {
            setLoading(2);
            console.error("Hata:", error);
        }
    };

    return (
        <div className='rounded-xl flex h-full w-full flex-col'>
            <div className='flex-grow bg-white rounded-t-xl rounded-br-xl flex flex-col gap-4 overflow-hidden'>
                <div className='font-bold text-sm pt-4 px-4'>{departure.country} - {destination?.country}</div>
                <div className='px-4 grid grid-cols-5 max-sm:grid-cols-3 max-[500px]:grid-cols-2'>
                    <div className='grid grid-rows-3 gap-1 justify-center whitespace-nowrap text-ellipsis pr-5 mr-auto'>
                        <div className='flex items-center gap-1'>
                            <img src={require("../assets/icons/airplaneTakeOff.png")} alt="Departure" className='size-6 filter grayscale brightness-0' />
                            <h4 className='text-sm'>Departure</h4>
                        </div>
                        <div className='flex items-center gap-1'>
                            <h3 className='font-bold'>{departureTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</h3>
                        </div>
                        <div className='flex items-center gap-1'>
                            <h4>Airport: {props.data.departureAirport}</h4>
                        </div>
                    </div>

                    <hr className='w-full self-center border-gray-400 border-t-2 max-sm:hidden' />

                    <div className='grid grid-rows-3 gap-1 whitespace-nowrap text-ellipsis px-5 max-[500px]:hidden'>
                        <div className='flex items-center gap-1 justify-center'>
                            <h4 className='text-sm font-bold'>{airline ? airline.publicName : "Unknown"}</h4>
                        </div>
                        <div className='flex items-center gap-1 justify-center'>
                            <img src={require("../assets/icons/purpleAirplane.png")} alt="Airline" className='size-6' />
                        </div>
                        <div className='flex items-center gap-1 justify-center'>
                            <h4 className='text-sm'>
                                {`${hour}h ${formattedMinute}m ${props.data.route.destinations.length <= 1 ? "(Nonstop)" : `(${props.data.route.destinations.length} stops)`}`}
                            </h4>
                        </div>
                    </div>

                    <hr className='w-full self-center border-gray-400 border-t-2 max-sm:hidden' />

                    <div className='grid grid-rows-3 gap-1 justify-center whitespace-nowrap text-ellipsis pl-5 ml-auto'>
                        <div className='flex items-center gap-1'>
                            <img src={require("../assets/icons/airplaneLanding.png")} alt="Arrival" className='size-6 filter grayscale brightness-0' />
                            <h4 className='text-sm'>Arrival</h4>
                        </div>
                        <div className='flex items-center gap-1'>
                            <h3 className='font-bold'>{landingTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</h3>
                        </div>
                        <div className='flex items-center gap-1'>
                            <h4>Airport: {props.data.route.destinations[0]}</h4>
                        </div>
                    </div>
                </div>

                <div className='flex-grow flex items-center justify-between'>
                    <div className='pb-4 px-4'>
                        <h4 className='text-lg font-bold text-mainPurple'>Price: ${props.data.price}</h4>
                        <h4 className='text-sm text-gray-800 min-[500px]:hidden'>{airline ? airline.publicName : "Unknown"}</h4>
                        <h4 className='text-sm text-gray-800 min-[500px]:hidden'>
                            {props.data.route.destinations.length <= 1 ? "Nonstop" : `${props.data.route.destinations.length} stops`}
                        </h4>
                        <h4 className='text-sm text-gray-800 min-[500px]:hidden'>{`${hour}h ${formattedMinute}m`}</h4>
                        <h4 className='text-sm text-gray-500'>{props.data.route.destinations.length <= 1 ? "One Way" : "Round Trip"}</h4>
                    </div>
                    <button 
                        onClick={bookFlight} 
                        className={`h-full rounded-tl-xl bg-mainPurple transition-colors duration-500 ${!loading&&"hover:bg-mainPurpleHover"} px-10 flex items-center text-white relative`}
                        disabled={loading}
                    >
                        <h4 className={`text-lg font-bold ${loading && "invisible"}`}>Book Flight</h4>
                        {loading === 4 ? 
                            <h4 className='text-md font-bold absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>Already Booked</h4> : 
                            loading === 3 ? 
                                <div className="text-lg font-bold absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">Booked</div> : 
                                loading === 2 ? 
                                    <div className="text-red-500 text-2xl font-bold absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">X</div> : 
                                    loading ? 
                                        <div className='flex items-center justify-center absolute w-full h-full left-0 top-0'><div className="loader"></div></div> : 
                                        ""
                        }
                    </button>
                </div>
            </div>
            <button className='px-4 py-2 rounded-b-md w-fit text-sm font-semibold bg-[#e6e0eb] text-mainPurple underline'>Check The Details</button>
        </div>
    );
}
