import React, { useState } from 'react';
import './App.css';
import Main from './pages/main';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MyFlights from './pages/myFlights';
import { HelperContext } from './helpers/HelperContext';


function App() {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 1);
  const [filter, setFilter] = useState({
    departureAirport:"IST",
    landingAirport:null,
    date:`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}T${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:00`
  })
  const [rightPanelFilter, setRightPanelFilter] = useState({
    sortBy: 'scheduleDate',
    departureTime: 'option1',
    stops: '0',
    airline: '',
  })
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Main />}></Route>
        <Route path="/myflights" element={<MyFlights />} />
      </>
    )
  )
  return (
    <HelperContext.Provider value={{ filter, setFilter,rightPanelFilter, setRightPanelFilter }}>
      <RouterProvider router={router} />
    </HelperContext.Provider>
  );
}

export default App;
