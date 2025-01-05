import Home from "./components/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Request from "./components/request";
import Navbar from "./components/navbar";
import About from "./components/about";
import Price from "./components/price";
import Docs from "./components/docs";
import Contract from "./components/contract";
import Customer from "./components/customer";
import { useLocation } from "react-router-dom";
import Success from "./components/success";
import EnvCheck from "./components/env";

function App() {
  return (
    <>
      <Router>
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/request" element={<Request />} />
          <Route path="/about" element={<About />} />
          <Route path="/price" element={<Price />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/success" element={<Success />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/envCheck" element={<EnvCheck />} />
        </Routes>
      </Router>
    </>
  );
  function ConditionalNavbar() {
    const location = useLocation();
    const excludeNavbarRoutes = ["/success", "/contract"];
    if (excludeNavbarRoutes.includes(location.pathname)) {
      return null;
    }
    return <Navbar />;
  }
}

export default App;
