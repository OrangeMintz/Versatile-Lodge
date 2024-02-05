import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Pages
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Employees from "./pages/employees/Employees.jsx";
import LoginAdmin from "./pages/loginAdmin/LoginAdmin.jsx";
import Payroll from "./pages/payroll/Payroll.jsx";
import ReviewsAdmin from "./pages/reviewsAdmin/ReviewsAdmin.jsx";
import RoomsAvailable from "./pages/roomsAvailable/RoomsAvailable.jsx";
import RoomsUnavailable from "./pages/roomsUnavailable/RoomsUnavailable.jsx";
import RoomsReserved from "./pages/roomsReserved/RoomsReserved.jsx";
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


//Components

import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './components/userContext.jsx';


axios.defaults.baseURL = 'http://localhost:8000'
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
        {/* <Route path="/payroll" element={<Payroll />} /> */}
        <Route path="/reviewsAdmin" element={<ReviewsAdmin />} />
        <Route path="/roomsAvailable" element={<RoomsAvailable />} />
        <Route path="/roomsUnavailable" element={<RoomsUnavailable />} />
        <Route path="/roomsReserved" element={<RoomsReserved />} />
        <Route path="/roomsBooking" element={<RoomsBooking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/AccountSettings" element={<AdminAccountSettings />} />
        <Route path="/AddRoom" element={<AddRoom />} />
        <Route path="/Reservation" element={<AddReservation />} />
        <Route path="/room/edit/:id" element={<EditRoom />} />
        <Route path="/randomQuote" element={<RandomQuote />} />


        {/* INVALID ACCESS */}
        <Route path="/404" element={<Error404 />} />
        <Route path="/401" element={<Error401 />} />

        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </UserContextProvider>

  );
}

export default App;


