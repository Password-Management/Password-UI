import asset from "../assets/home.jpg";
import React , {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  let navigate = useNavigate();
  useEffect (() => {
    sessionStorage.clear();
  })
  return (
    <>
      <section className="flex items-center justify-between min-h-screen px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <div className="text-center md:text-left md:w-1/2 mb-6 md:mb-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
              Secure Your Passwords, Simplified.
            </h1>
            <span className="text-lg sm:text-xl text-gray-600">
              At <span className="font-bold text-black">KeyPass</span>, we
              prioritize your data security above all else. Leveraging advanced
              RSA encryption alongside cutting-edge ASA technology, we ensure
              your passwords are safeguarded with the highest level of
              protection.
            </span>
            <div className="relative mt-4 flex space-x-4">
              <button
                className="px-6 py-2 bg-[#074F94] hover:bg-[#0871C9] text-white rounded-md flex items-center justify-center min-w-[200px]"
                onClick={() => {
                  navigate("/request");
                }}
              >
                Get Demo Product
              </button>

              <button
                onClick={() => {
                  navigate("/price");
                }}
                className="px-6 py-2 bg-[#074F94] hover:bg-[#0871C9] text-white rounded-lg min-w-[200px]"
              >
                Buy Now
              </button>

              <button
                onClick={() => {
                  navigate("/customer");
                }}
                className="px-6 py-2 bg-[#074F94] hover:bg-[#0871C9] text-white rounded-lg min-w-[200px]"
              >
                Customer Portal
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
            <img src={asset} alt="Secure" className="w-3/4 md:w-full h-auto" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
