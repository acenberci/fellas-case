import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Formik, Form, Field } from "formik";
import Select from 'react-select';
import { components } from 'react-select';
import DatePicker from "react-datepicker";
import { CalendarIcon } from '@heroicons/react/24/solid';
import airportsData from '../assets/data/airports.json';
import "react-datepicker/dist/react-datepicker.css";
import { HelperContext } from '../helpers/HelperContext';

export default function TopFilter() {
    const [airports, setAirports] = useState([]);
    const { setFilter,filter } = useContext(HelperContext);

    const formattedAirports = useMemo(() => {
        return airportsData.map(airport => ({
            label: `${airport.name} / ${airport.city}`,
            value: airport.iata_code
        }));
    }, []);

    useEffect(() => {
        setAirports(formattedAirports);
    }, [formattedAirports]);

    const MenuList = ({ children, ...props }) => (
        <components.MenuList {...props}>
            {Array.isArray(children) ? children.slice(0, props.selectProps?.maxOptions) : children}
        </components.MenuList>
    );

    return (
        <Formik
            initialValues={{
                flightType: "oneWay",
                fromLocation: filter.departureAirport,
                toLocation: filter.landingAirport,
                departDate: filter.date,
                returnDate: null,
            }}
            onSubmit={(values) => {
                const depDate = new Date(values.departDate)
                setFilter(prevFilter => ({
                    ...prevFilter,
                    departureAirport: values.fromLocation,
                    landingAirport: values.toLocation,
                    date: `${depDate.getFullYear()}-${String(depDate.getMonth() + 1).padStart(2, '0')}-${String(depDate.getDate()).padStart(2, '0')}T${String(depDate.getHours()).padStart(2, '0')}:${String(depDate.getMinutes()).padStart(2, '0')}:00`
                }))
                console.log(values);
            }}
        >
            {({ setFieldValue, values }) => (
                <Form>
                    <div className="bg-white rounded-xl row-span-1 p-4 flex flex-col max-sm:gap-4 sm:justify-between h-full max-lg:gap-5">
                        <div className="flex justify-between items-center max-sm:gap-2">
                            <div className='flex gap-2 items-center'>
                                <img
                                    src={require("../assets/icons/airplane.png")}
                                    alt="Airplane Icon"
                                    className='size-6 invert grayscale'
                                />
                                <h4 className='text-md font-bold'>BOOK YOUR FLIGHT</h4>
                            </div>
                            <div className="flex">
                                <label className="flex items-center">
                                    <Field
                                        type="radio"
                                        name="flightType"
                                        value="roundTrip"
                                        className="hidden peer"
                                    />
                                    <span className={`py-1 px-2 bg-[#e6e0eb] text-mainPurple peer-checked:bg-mainPurple peer-checked:text-white rounded-l-full cursor-pointer transition-colors duration-500 ease-in-out ${values.flightType === "roundTrip" ? "bg-mainPurple text-white" : ""} hover:bg-mainPurpleHover hover:text-white`}>
                                        Round trip
                                    </span>
                                </label>
                                <label className="flex items-center">
                                    <Field
                                        type="radio"
                                        name="flightType"
                                        value="oneWay"
                                        className="hidden peer"
                                    />
                                    <span className={`py-1 px-2  bg-[#e6e0eb] text-mainPurple peer-checked:bg-mainPurple peer-checked:text-white rounded-r-full cursor-pointer transition-colors duration-500 ease-in-out ${values.flightType === "oneWay" ? "bg-mainPurple text-white" : ""} hover:bg-mainPurpleHover hover:text-white`}>
                                        One way
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="gap-4 md:grid-cols-2 grid">
                            <div className="w-full flex max-sm:flex-col gap-1 max-sm:gap-4">
                                <div className="w-full select-item relative">
                                    <img src={require("../assets/icons/airplaneTakeOff.png")} alt="Takeoff Icon" className='absolute size-6 left-4 z-10 -translate-y-1/2 top-1/2' />
                                    <Select
                                        components={{ MenuList }}
                                        maxOptions={5}
                                        options={airports}
                                        placeholder="From"
                                        className="w-full"
                                        classNamePrefix="react-select"
                                        onChange={(option) => setFieldValue('fromLocation', option.value)}
                                        defaultValue={{ value: "IST", label: "Istanbul / Istanbul" }}
                                    />
                                </div>
                                <div className="w-full select-item relative">
                                    <img src={require("../assets/icons/airplaneLanding.png")} alt="Landing Icon" className='absolute size-6 left-4 z-10 -translate-y-1/2 top-1/2' />
                                    <Select
                                        components={{ MenuList }}
                                        maxOptions={5}
                                        options={airports}
                                        placeholder="To"
                                        className="w-full"
                                        classNamePrefix="react-select"
                                        onChange={(option) => setFieldValue('toLocation', option.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex gap-1">
                                <div className='flex relative w-full'>
                                    <CalendarIcon className='absolute size-6 left-4 z-10 -translate-y-1/2 top-1/2 text-mainPurple' />
                                    <DatePicker
                                        selected={values.departDate || filter.date}
                                        onChange={(date) => setFieldValue('departDate', date)}
                                        calendarClassName="flight-calendar"
                                        className={`w-full h-full border-[2px] py-2 rounded-l-full px-14 focus:border-mainPurple ${!(values.flightType === "roundTrip") && "rounded-r-full"}`}
                                        placeholderText=""
                                        name='departDate'
                                        selectsStart={values.flightType === "roundTrip"}
                                        startDate={values.departDate}
                                        endDate={values.flightType === "roundTrip" && values.returnDate}
                                        maxDate={values.flightType === "roundTrip" && values.returnDate}
                                        autoComplete="off"
                                    />
                                </div>
                                {values.flightType === "roundTrip" && (
                                    <div className='flex relative w-full'>
                                        <CalendarIcon className='absolute size-6 left-4 z-10 -translate-y-1/2 top-1/2 text-mainPurple' />
                                        <DatePicker
                                            selected={values.returnDate}
                                            onChange={(date) => setFieldValue('returnDate', date)}
                                            calendarClassName="flight-calendar"
                                            className="w-full h-full border-[2px] rounded-r-full px-14 focus:border-purple-500"
                                            placeholderText=""
                                            name='returnDate'
                                            selectsEnd={values.flightType === "roundTrip"}
                                            startDate={values.departDate}
                                            minDate={values.departDate}
                                            autoComplete="off"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="py-1 px-3 transition-colors duration-500 hover:bg-mainPurpleHover bg-mainPurple  text-white rounded">
                                Show Flights
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik >
    );
}
