import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import FlightCard from '../components/flightcard';

export default function MyFlights() {
    const [avgPrice, setAvgPrice] = useState()
    const [flights, setFlight] = useState({ mainFlights: [], sortedFlights: [] })
    useEffect(() => {
        const fetchData = async () => {
            let totalPrice = 0;
            try {
                const response = await axios.get(`http://localhost:3001/flights/getFlights`);
                response.data.forEach((r) => {
                    totalPrice += r.price;
                })
                setAvgPrice(Math.round(totalPrice / response.data.length))
                setFlight(a => ({ ...a, mainFlights: response.data, sortedFlights: [...response.data].reverse() }))
            } catch (error) {
                console.error("Hata:", error);
            }
        };
        fetchData()
    }, [])
    function sortBooks(e) {
        switch (e.target.value) {
            case "lastBooked":
                setFlight((a) => ({ ...a, sortedFlights: [...a.mainFlights].reverse() }));
                break;
            case "firstBooked":
                setFlight((a) => ({ ...a, sortedFlights: [...a.mainFlights] }));
                break;
            case "priceAscending":
                let tempList = [...flights.mainFlights];
                tempList.sort((a, b) => a.price - b.price);
                setFlight((a) => ({ ...a, sortedFlights: tempList }));
                break;
            case "priceDescending":
                let tempList2 = [...flights.mainFlights];
                tempList2.sort((a, b) => b.price - a.price);
                setFlight((a) => ({ ...a, sortedFlights: tempList2 }));
                break;
            default:
                console.warn("Beklenmeyen değer:", e.target.value);
                break;
        }
    }
    return (
        <>
            <header className='z-10 w-full py-1 px-6 box-border bg-w flex max-lg:flex-col justify-between items-center border-b shadow-sm bg-white mb-6 max-lg:gap-2'>
                <div className='flex gap-2 '>
                    <button className=' border rounded-[4px] px-2 py-1 bg-white shadow-sm text-xs font-semibold hover:bg-gray-100 hover:shadow-sm'>Times</button>
                    <button className=' border rounded-[4px] px-2 py-1 bg-white shadow-sm text-xs font-semibold hover:bg-gray-100 hover:shadow-sm'>Stops</button>
                    <button className=' border rounded-[4px] px-2 py-1 bg-white shadow-sm text-xs font-semibold hover:bg-gray-100 hover:shadow-sm'>Airlines</button>
                    <button className=' border rounded-[4px] px-2 py-1 bg-white shadow-sm text-xs font-semibold hover:bg-gray-100 hover:shadow-sm'>Airports</button>
                    <button className=' border rounded-[4px] px-2 py-1 bg-white shadow-sm text-xs font-semibold hover:bg-gray-100 hover:shadow-sm'>Amenities</button>
                    <button className='flex items-center text-blue-500 gap-1 text-xs font-semibold hover:shadow-sm px-2'>Edit Search<ChevronDownIcon className='size-3'></ChevronDownIcon></button>
                </div>
                <div className='flex h-14 items-center gap-3 max-lg:w-full max-lg:justify-between'>
                    <button className="text-sm font-semibold hover:scale-105 hover:brightness-105">
                        <p className='flex'> ★<p className='text-gray-300'>★★</p></p>
                        <p className='text-gray-300'>★★★</p>
                    </button>
                    <div className=' h-full py-4 px-2'>
                        <div className='border-l border-solid border-[rgb(153,153,153)] h-full'></div>
                    </div>
                    <button className="text-sm font-semibold hover:scale-105 hover:brightness-105">
                        <p className='flex'> ★★<p className='text-gray-300'>★</p></p>
                        <p className='text-gray-300'>★★★</p>
                    </button>
                    <div className=' h-full py-4 px-2'>
                        <div className='border-l border-solid border-[rgb(153,153,153)] h-full'></div>
                    </div>
                    <button className="text-sm font-semibold hover:scale-105 hover:brightness-105">
                        <p className='flex'> ★★★</p>
                        <p className='text-gray-300'>★★★</p>
                    </button>
                    <div className=' h-full py-4 px-2'>
                        <div className='border-l border-solid border-[rgb(153,153,153)] h-full'></div>
                    </div>
                    <button className="text-sm font-semibold hover:scale-105 hover:brightness-105">
                        <p className='flex'> ★★★</p>
                        <p className='flex'> ★<p className='text-gray-300'>★★</p></p>
                    </button>
                    <div className=' h-full py-4 px-2'>
                        <div className='border-l border-solid border-[rgb(153,153,153)] h-full'></div>
                    </div>
                    <button className="text-sm font-semibold hover:scale-105 hover:brightness-105">
                        <p className='flex'> ★★★</p>
                        <p className='flex'> ★★<p className='text-gray-300'>★</p></p>
                    </button>
                    <div className=' h-full py-4 px-2'>
                        <div className='border-l border-solid border-[rgb(153,153,153)] h-full'></div>
                    </div>
                    <button className="text-sm font-semibold hover:scale-105 hover:brightness-105">
                        <p className='flex'> ★★★</p>
                        <p className='flex'> ★★★</p>
                    </button>
                </div>
            </header>
            <div className='flex flex-col gap-6'>
                <div className='flex justify-between px-6 max-sm:px-2'>
                    <div className='flex items-center gap-1'>
                        <label htmlFor="sortBy" className='text-sm font-semibold text-ellipsis whitespace-nowrap'>Sort by:</label>
                        <select onChange={(e) => sortBooks(e)} id="sortBy" name="sortBy" className="rounded-lg bg-transparent border-0 ring-0 font-bold text-sm">
                            <option value="lastBooked">Last Booked</option>
                            <option value="firstBooked">First Booked</option>
                            <option value="priceAscending">Price Ascending</option>
                            <option value="priceDescending">Price Descending</option>
                        </select>

                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center justify-center rounded-full size-5 border-blue-500 text-blue-500 border font-semibold text-sm'>
                            i
                        </div>
                        <div className='flex gap-1 items-center'>
                            <h4 className='text-sm'>Avg Fare:</h4>
                            <h4 className='text-sm font-bold'>${avgPrice}</h4>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col px-6 pb-6 gap-6'>
                    {flights.sortedFlights.map((response, i) => <FlightCard key={i} data={response}></FlightCard>)}
                </div>
            </div>
        </>
    )
}
