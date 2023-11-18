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
import ProfileAdmin from "./pages/profileAdmin/ProfileAdmin.jsx";
import ProfileEmployee from "./pages/profileEmployee/ProfileEmployee.jsx";
import Unauthorized from "./pages/unauthorized/unauthorized.jsx"

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
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/reviewsAdmin" element={<ReviewsAdmin />} />
        <Route path="/roomsAvailable" element={<RoomsAvailable />} />   {/*rooms*/}
        <Route path="/roomsUnavailable" element={<RoomsUnavailable />} />     {/*rooms*/}
        <Route path="/roomsReserved" element={<RoomsReserved />} />         {/*transaction*/}
        <Route path="/roomsBooking" element={<RoomsBooking />} />         {/*transaction*/}
        <Route path="/profile" element={<ProfileAdmin />} />


        <Route path="/404" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/404" />} />


        {/* <Route path="/profileEmployee" element={<ProfileEmployee />} /> */}
      </Routes>
    </UserContextProvider>

  );
}

export default App;


