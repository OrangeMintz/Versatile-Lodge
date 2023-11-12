import React from 'react';
import { Routes, Route } from "react-router-dom";

//Pages
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Employees from "./pages/employees/Employees.jsx";
import LoginAdmin from "./pages/loginAdmin/LoginAdmin.jsx";
import Payroll from "./pages/payroll/Payroll.jsx";
import ReviewsAdmin from "./pages/reviewsAdmin/ReviewsAdmin.jsx";
import RoomsAdmin from "./pages/roomsAdmin/RoomsAdmin.jsx";
import Transaction from "./pages/transaction/Transaction.jsx";




function App() {
  return (

      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/reviewsAdmin" element={<ReviewsAdmin />} />
        <Route path="/roomsAdmin" element={<RoomsAdmin />} />
        <Route path="/transaction" element={<Transaction />} />

      </Routes>

  );
}

export default App;


