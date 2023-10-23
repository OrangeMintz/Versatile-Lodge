import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import About from "./pages/about/About";
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


        <Route path="/" element={<Home />} />
        <Route path="/room" element={<List />} />
        <Route path="/about" element={<About />} />

        {/* PROTECT THESE ROUTES */}
        <Route element={<RequireAuth allowedRoles={['admin']} />} >
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
