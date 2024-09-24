import React, { useContext } from 'react';
import { HelperContext } from '../helpers/HelperContext';

export default function RightFilter() {
    const { rightPanelFilter, setRightPanelFilter } = useContext(HelperContext);

    const handleSortChange = (event) => {
        setRightPanelFilter({ ...rightPanelFilter, sortBy: event.target.value });
    };

    const handleDepartureChange = (event) => {
        setRightPanelFilter({ ...rightPanelFilter, departureTime: event.target.value });
    };

    const handleStopsChange = (event) => {
        setRightPanelFilter({ ...rightPanelFilter, stops: event.target.value });
    };

    const handleAirlineChange = (event) => {
        setRightPanelFilter({ ...rightPanelFilter, airline: event.target.value });
    };

    return (
        <div className='py-4 rounded-xl col-span-1 flex flex-col gap-4 overflow-y-hidden lg:col-span-1 max-lg:col-span-4 max-lg:grid max-lg:grid-cols-4 max-sm:grid-cols-2 max-lg:bg-white max-lg:px-4'>
            <div className='flex flex-col gap-2'>
                <label htmlFor="sortBy" className='text-sm font-bold'>Sort by:</label>
                <select id="sortBy" name="sortBy" className='w-full py-2 px-4 rounded-lg focus:border-transparent' 
                        value={rightPanelFilter.sortBy} onChange={handleSortChange}>
                    <option value="flightName">Flight Name</option>
                    <option value="scheduleDate">Schedule Date</option>
                    <option value="scheduleTime">Schedule Time</option>
                    <option value="flightDirection">Flight Direction</option>
                    <option value="airlineCode">Airline Code</option>
                    <option value="id">Flight ID</option>
                </select>
            </div>

            <div className='flex flex-col gap-2'>
                <h4 className='text-sm font-bold'>Departure Time</h4>
                <div>
                    <input type="radio" name="departure" id='departure1' value="option1" className="filterRadioButtons" 
                           checked={rightPanelFilter.departureTime === 'option1'} onChange={handleDepartureChange} />
                    <label htmlFor="departure1" className="inputLabel text-sm">6:00 AM - 6:00 PM</label>
                </div>
                <div>
                    <input type="radio" name="departure" id='departure2' value="option2" className="filterRadioButtons" 
                           checked={rightPanelFilter.departureTime === 'option2'} onChange={handleDepartureChange} />
                    <label htmlFor="departure2" className="inputLabel text-sm">6:00 PM - 6:00 AM</label>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <h4 className='text-sm font-bold'>Stops</h4>
                <div>
                    <input type="radio" name="stops" id='nonStop' value="0" className="filterRadioButtons" 
                           checked={rightPanelFilter.stops === '0'} onChange={handleStopsChange} />
                    <label htmlFor="nonStop" className="inputLabel text-sm">Nonstop</label>
                </div>
                <div>
                    <input type="radio" name="stops" id='oneStop' value="1" className="filterRadioButtons" 
                           checked={rightPanelFilter.stops === '1'} onChange={handleStopsChange} />
                    <label htmlFor="oneStop" className="inputLabel text-sm">1 Stop</label>
                </div>
                <div>
                    <input type="radio" name="stops" id='moreThanOneStop' value="2" className="filterRadioButtons" 
                           checked={rightPanelFilter.stops === '2'} onChange={handleStopsChange} />
                    <label htmlFor="moreThanOneStop" className="inputLabel text-sm">2+ Stops</label>
                </div>
            </div>

            <div className='flex flex-col gap-2 flex-grow max-h-full overflow-y-hidden'>
                <h4 className='text-sm font-bold'>Airlines Included</h4>
                <div>
                    <input type="radio" name="airline" id="Alitalia" value="Alitalia" className="filterRadioButtons" 
                           checked={rightPanelFilter.airline === 'Alitalia'} onChange={handleAirlineChange} />
                    <label htmlFor="Alitalia" className="inputLabel text-sm">Alitalia</label>
                </div>
                <div>
                    <input type="radio" name="airline" id="Lufthansa" value="Lufthansa" className="filterRadioButtons" 
                           checked={rightPanelFilter.airline === 'Lufthansa'} onChange={handleAirlineChange} />
                    <label htmlFor="Lufthansa" className="inputLabel text-sm">Lufthansa</label>
                </div>
                <div>
                    <input type="radio" name="airline" id="AirFrance" value="AirFrance" className="filterRadioButtons" 
                           checked={rightPanelFilter.airline === 'AirFrance'} onChange={handleAirlineChange} />
                    <label htmlFor="AirFrance" className="inputLabel text-sm">Air France</label>
                </div>
                <div>
                    <input type="radio" name="airline" id="BrusselsAirlines" value="BrusselsAirlines" className="filterRadioButtons" 
                           checked={rightPanelFilter.airline === 'BrusselsAirlines'} onChange={handleAirlineChange} />
                    <label htmlFor="BrusselsAirlines" className="inputLabel text-sm">Brussels Airlines</label>
                </div>
                <div>
                    <input type="radio" name="airline" id="TurkishAirlines" value="TurkishAirlines" className="filterRadioButtons" 
                           checked={rightPanelFilter.airline === 'TurkishAirlines'} onChange={handleAirlineChange} />
                    <label htmlFor="TurkishAirlines" className="inputLabel text-sm">Turkish Airlines</label>
                </div>
            </div>
        </div>
    );
}
