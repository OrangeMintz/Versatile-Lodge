import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Pages
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Rooms from "./pages/rooms/Rooms";
import RoomDetail from "./pages/roomDetail/RoomDetail";
import Contact from "./pages/contact/Contact";
import Reviews from "./pages/reviews/Reviews";
import AccountSetting from "./pages/accountSetting/AccountSetting";
import BookingHistory from "./pages/bookingHistory/BookingHistory";
import ChangePassword from "./pages/changePassword/ChangePassword";
import BookNow from "./pages/bookNow/BookNow";
import BookingHistoryDetails from "./pages/bookingHistoryDetails/BookingHistoryDetails";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import Unauthorized from "./pages/unauthorized/Unauthorized.jsx"

//Components
import Layout from './component/layout';
import RequireAuth from './component/RequireAuth';
//
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './context/userContext.jsx';

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true



function App() {
  return (
    <UserContextProvider>
      <Toaster position='bottom-right' gutter={12} toastOptions={{
        style: {
          background: '#DCC69C',
          color: '#363636',
          fontSize: "12px"
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
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/room" element={<Rooms />} />
        <Route path="/room/roomDetail/:id" element={<RoomDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/bookingHistoryDetails" element={<BookingHistoryDetails />} />

        <Route path="/404" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/404" />} />

        {/* PROTECT THESE ROUTES */}
        {/* <Route element={<RequireAuth />}> */}
        <Route path="/accountSetting/:id" element={<AccountSetting />} />
        <Route path="/bookingHistory/:id" element={<BookingHistory />} />
        <Route path="/changePassword/:id" element={<ChangePassword />} />
        <Route path="/room/booking/:id/:fromDate/:toDate" element={<BookNow />} />

        {/* </Route> */}
      </Routes>
    </UserContextProvider>

  );
}

export default App;