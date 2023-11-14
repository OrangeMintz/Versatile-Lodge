import React from 'react';
import { Routes, Route } from "react-router-dom";

//Pages
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Employees from "./pages/employees/Employees.jsx";
import LoginAdmin from "./pages/loginAdmin/LoginAdmin.jsx";
import Payroll from "./pages/payroll/Payroll.jsx";
import ReviewsAdmin from "./pages/reviewsAdmin/ReviewsAdmin.jsx";
import RoomsAvailable from "./pages/roomsAvailable/RoomsAvailable.jsx";
import RoomsOccupied from "./pages/roomsOccupied/RoomsOccupied.jsx";
import RoomsReserved from "./pages/roomsReserved/RoomsReserved.jsx";
import RoomsBooking from "./pages/roomsBooking/RoomsBooking.jsx";





function App() {
  return (

      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/reviewsAdmin" element={<ReviewsAdmin />} />
        <Route path="/roomsAvailable" element={<RoomsAvailable />} />   {/*rooms*/}
        <Route path="/roomsOccupied" element={<RoomsOccupied />} />     {/*rooms*/}
        <Route path="/roomsReserved" element={<RoomsReserved />} />         {/*transaction*/}
        <Route path="/roomsBooking" element={<RoomsBooking />} />         {/*transaction*/}

      </Routes>

  );
}

export default App;


