import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";



// import Dashboard from "./admin/dashboard/Dashboard";
import Dashboard from "./pages/dashboard/Dashboard";


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




        {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        




        {/* PROTECT THESE ROUTES */}
        {/* <Route element={<RequireAuth />}> */}
        <Route path="/accountSetting" element={<AccountSetting />} />
        <Route path="/bookingHistory" element={<BookingHistory />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/room/booking/:id" element={<BookNow />} />
        {/* </Route> */}
      </Routes>
    </UserContextProvider>

  );
}

export default App;



// return (
//   // <BrowserRouter>
//   <Routes>
//     <Route path="/" element={<Layout />}>

//       {/* PUBLIC ROUTES */}
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/rooms" element={<Rooms />} />
//       <Route path="/roomDetail/:id" element={<RoomDetail />} />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="/reviews" element={<Reviews />} />
//       <Route path="/accountSetting" element={<AccountSetting />} />
//       <Route path="/bookingHistory" element={<BookingHistory />} />
//       <Route path="/changePassword" element={<ChangePassword />} />
//       <Route path="/booking/:id" element={<BookNow />} />

//       {/* PROTECT THESE ROUTES */}
//       <Route element={<RequireAuth />} >
//         <Route path="/protected" element={<Staticpage />} />
//       </Route>

//       {/* PROTECT THESE ROUTES WITH ROLE BASED */}
//       <Route element={<RequireAuth allowedRoles={['employee']} />} >
//         <Route path="/protected/hehe" element={<Home />} />
//       </Route>

//     </Route>
//   </Routes>

//   // </BrowserRouter>
// );
