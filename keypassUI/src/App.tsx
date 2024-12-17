import Home from "./components/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Request from "./components/request";
import Navbar from "./components/navbar";
import About from "./components/about";
import Price from "./components/price";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/request" element={<Request />} />
          <Route path="/about" element={<About />} />
          <Route path="/price" element={<Price />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
