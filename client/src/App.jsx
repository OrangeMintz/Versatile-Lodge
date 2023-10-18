import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import About from "./pages/about/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<List />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
