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
import Staticpage from './pages/staticpage/staticpage';
import BookNow from "./pages/bookNow/BookNow";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Layout from './component/layout';


import RequireAuth from './component/RequireAuth';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/roomDetail/:id" element={<RoomDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reviews" element={<Reviews />} />

        {/* PROTECT THESE ROUTES */}
        <Route element={<RequireAuth />}>
          <Route path="/protected" element={<Staticpage />} />
          <Route path="/accountSetting" element={<AccountSetting />} />
          <Route path="/bookingHistory" element={<BookingHistory />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/booking/:id" element={<BookNow />} />

          {/* Add other protected routes here */}
        </Route>
        {/* Add other routes here */}
      </Route>
    </Routes>
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
