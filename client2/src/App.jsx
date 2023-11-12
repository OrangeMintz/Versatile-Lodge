import React from 'react';
import { Routes, Route } from "react-router-dom";

//Pages
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Reviews from "./pages/reviews/Reviews.jsx";




function App() {
  return (

      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/reviews" element={<Reviews />} />

      </Routes>

  );
}

export default App;


