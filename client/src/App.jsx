import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import About from "./pages/about/About";
import Rooms from "./pages/rooms/Rooms";
import RoomDetail from "./pages/roomDetail/RoomDetail";
import Contact from "./pages/contact/Contact";
import Reviews from "./pages/reviews/Reviews";
import AccountSetting from "./pages/accountSetting/AccountSetting";
import BookingHistory from "./pages/bookingHistory/BookingHistory";
import ChangePassword from "./pages/changePassword/ChangePassword";
import BookNow from "./pages/bookNow/BookNow";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Layout from './component/layout';

import RequireAuth from './component/RequireAuth';



function App() {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/unauthorized" element={<About />} />
        <Route path="/unauthorized" element={<Rooms />} />
        <Route path="/unauthorized" element={<RoomDetail />} />
        <Route path="/unauthorized" element={<Contact />} />
        <Route path="/unauthorized" element={<Reviews />} />
        <Route path="/unauthorized" element={<AccountSetting />} />
        <Route path="/unauthorized" element={<BookingHistory />} />
        <Route path="/unauthorized" element={<ChangePassword />} /> */}



        <Route path="/" element={<Home />} />
        <Route path="/room" element={<List />} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms" element={<Rooms />} />
        {/* <Route path="/roomDetail" element={<RoomDetail />} /> */}
        <Route path="/roomDetail/:id" element={<RoomDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/accountSetting" element={<AccountSetting />} />
        <Route path="/bookingHistory" element={<BookingHistory />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/bookNow" element={<BookNow />} />
        


        {/* PROTECT THESE ROUTES */}
        <Route element={<RequireAuth />} >
          <Route path="/protected/admin" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['employee']} />} >
          <Route path="/protected" element={<Home />} />
        </Route>

      </Route>
    </Routes>
    // </BrowserRouter>
  );
}

export default App;
