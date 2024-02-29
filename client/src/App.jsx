import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Pages
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Employees from "./pages/employees/Employees.jsx";
import LoginAdmin from "./pages/loginAdmin/LoginAdmin.jsx";
import RoomsAvailable from "./pages/roomsAvailable/RoomsAvailable.jsx";
import RoomsUnavailable from "./pages/roomsUnavailable/RoomsUnavailable.jsx";
import RoomsBooking from "./pages/roomsBooking/RoomsBooking.jsx";
import Profile from "./pages/profile/Profile.jsx";
import AdminAccountSettings from "./pages/adminAccountSettings/AdminAccountSettings.jsx";
import Error404 from "./pages/404/404.jsx";
import Error401 from "./pages/401/401.jsx";
import AddRoom from "./pages/addRoom/AddRoom.jsx";
import AddReservation from "./pages/addReservation/AddReservation.jsx";
import EditRoom from './pages/editRoom/editRoom.jsx';
import RandomQuote from './pages/randomQuote/RandomQuote.jsx';
import EmployeesArchive from './pages/employees/EmployeesArchive.jsx';
import Receptions from './pages/receptions/Receptions.jsx';

//Components

import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './components/userContext.jsx';


// axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.baseURL = 'http://192.168.8.69:8000'
axios.defaults.withCredentials = true


function App() {
  return (
    <UserContextProvider>
      <Toaster position='bottom-right' gutter={12} toastOptions={{
        style: {
          background: '#DCC69C',
          color: '#363636',
          fontSize: "12px",
          boxShadow: "10px 10px 15px rgba(0,0,0,.4)"


        },

        // Default options for specific types
        success: {
          duration: 3500,
          theme: {
            primary: '#DCC69C',
            secondary: 'black',
          },
        },
      }} />
      <Routes>

        <Route path="/" element={<LoginAdmin />} />

        {/* REQUIRED AUTHENTICATION */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/archive" element={<EmployeesArchive />} />
        <Route path="/roomsAvailable" element={<RoomsAvailable />} />
        <Route path="/roomsUnavailable" element={<RoomsUnavailable />} />
        <Route path="/transactions/booking" element={<RoomsBooking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/AccountSettings" element={<AdminAccountSettings />} />
        <Route path="/AddRoom" element={<AddRoom />} />
        <Route path="/transactions/booking/room" element={<AddReservation />} />
        <Route path="/room/edit/:id" element={<EditRoom />} />
        <Route path="/randomQuote" element={<RandomQuote />} />
        <Route path="/receptions" element={<Receptions />} />

        {/* INVALID ACCESS */}
        <Route path="/404" element={<Error404 />} />
        <Route path="/401" element={<Error401 />} />
        <Route path="*" element={<Navigate to="/404" />} />

      </Routes>
    </UserContextProvider>

  );
}

export default App;


