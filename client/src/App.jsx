import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import About from "./pages/about/About";
import Rooms from "./pages/rooms/Rooms";
import RoomDetail from "./pages/roomDetail/RoomDetail";
import Contact from "./pages/contact/Contact";
import Reviews from "./pages/reviews/Reviews";
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
        <Route path="/unauthorized" element={<About />} />
        <Route path="/unauthorized" element={<Rooms />} />
        <Route path="/unauthorized" element={<RoomDetail />} />
        <Route path="/unauthorized" element={<Contact />} />
        <Route path="/unauthorized" element={<Reviews />} />


        <Route path="/" element={<Home />} />
        <Route path="/room" element={<List />} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/roomDetail" element={<RoomDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reviews" element={<Reviews />} />

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
