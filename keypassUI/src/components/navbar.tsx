import React, { useState } from "react";
import logo from "../assets/nav.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let navigate = useNavigate();
  let content;
  const loginCheck = sessionStorage.getItem("customerLogin");
  if (loginCheck !== null && loginCheck === "true") {
    content = (
      <>
        <li>
          <Link to={"/about"}>
            <button className="hover:text-gray-500"><strong>About</strong></button>
          </Link>
        </li>
        <li>
          <Link to={"/price"}>
            <button className="hover:text-gray-500"><strong>Pricing</strong></button>
          </Link>
        </li>
        <li>
          <Link to={"/customer"}>
            <button className="hover:text-gray-500 "><strong>Customer</strong></button>
          </Link>
        </li>
        <li>
          <Link to={"/envCheck"}>
            <button className="hover:text-gray-500"><strong>EnvCheck</strong></button>
          </Link>
        </li>
      </>
    );
  } else {
    content = (
      <>
        <li>
          <Link to={"/about"}>
            <button className="hover:text-gray-500"><strong>About</strong></button>
          </Link>
        </li>
        <li>
          <Link to={"/price"}>
            <button className="hover:text-gray-500 "><strong>Pricing</strong></button>
          </Link>
        </li>
      </>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-10 ">
      <nav className="flex items-center justify-between px-4 md:px-8 h-16">
        <div className="flex items-center">
          <img
            className="w-16 cursor-pointer"
            alt="Custom Logo"
            src={logo}
            onClick={() => {
              navigate("/");
            }}
          />
          <span className="text-xl font-bold text-black">KeyPass</span>
        </div>
        <div className="hidden md:flex justify-center items-center w-full">
          <ul className="flex md:flex-row flex-col md:gap-[5vw] gap-2 text-center">
            {content}
          </ul>
        </div>
        <div className="ml-auto hidden md:block">
          <button className="px-6 py-2 bg-[#074F94] hover:bg-[#0871C9] text-white rounded-md flex items-center justify-center min-w-[150px]">
            Contact Us
          </button>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            <span className="text-3xl">&#9776;</span>
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-20 flex flex-col space-y-4 px-4 py-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="self-end text-2xl font-bold mb-4 focus:outline-none"
          >
            &#10005;
          </button>
          <ul className="flex flex-col space-y-4">{content}</ul>
          <button className="px-6 py-2 bg-[#074F94] hover:bg-[#0871C9] text-white rounded-md">
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
