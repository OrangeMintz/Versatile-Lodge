import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import About from "./pages/about/About";
import Login from "./pages/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<List />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />




      </Routes>
    </BrowserRouter>
  )
}

export default App;
