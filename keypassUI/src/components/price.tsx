import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Price: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<"Infra" | "SAAS">("Infra");
  const navigate = useNavigate();

  const handleClick = (type: string, env: string) => {
    navigate("/request", { state: { planType: type, env: env} });
  };

  return (
    <>
      {/* Main Section */}
      <section className="min-h-screen flex flex-col items-center justify-center mt-16 md:mt-10">
        <div className="w-full max-w-6xl rounded-xl p-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Our Pricing Plans
          </h2>
          <div className="relative flex items-center justify-center w-full my-6">
            <div className="flex items-center bg-gray-200 rounded-full w-40 h-10 p-1">
              <button
                className={`w-1/2 h-full rounded-full transition-all ${
                  selectedOption === "Infra"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }`}
                onClick={() => setSelectedOption("Infra")}
              >
                Infra
              </button>
              <button
                className={`w-1/2 h-full rounded-full transition-all ${
                  selectedOption === "SAAS"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }`}
                onClick={() => setSelectedOption("SAAS")}
              >
                SAAS
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-100 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-center text-gray-800">
                Basic Plan
              </h3>
              <p className="text-center text-gray-600 my-4">{selectedOption === "Infra" ? "$5.00/month" : "$19.99/month"}</p>
              <ul className="text-gray-600 mb-4">
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-green-500">✔</span> 4 Users
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-green-500">✔</span> 10 Passwords Each
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-green-500">✔</span> Basic Support
                </li>
              </ul>
              <button
                onClick={() => handleClick("Basic Plan", selectedOption)}
                className="w-full bg-[#074F94] hover:bg-[#0871C9] text-white py-2 rounded-lg transition-colors"
              >
                Choose Plan
              </button>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 bg-[#88BBDC] rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-center text-gray-800">
                Pro Plan
              </h3>
              <p className="text-center text-gray-600 my-4">{selectedOption === "Infra" ? "$19.99/month" : "$29.99/month"}</p>
              <ul className="text-gray-600 mb-4">
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-green-500">✔</span> 50 Users
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-green-500">✔</span> 50 Passwords Each
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-green-500">✔</span> Priority Support
                </li>
              </ul>
              <button
                onClick={() => handleClick("Pro Plan", selectedOption)}
                className="w-full bg-[#074F94] hover:bg-[#0871C9] text-white py-2 rounded-lg transition-colors"
              >
                Choose Plan
              </button>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-100 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-center text-gray-800">
                Premium Plan
              </h3>
              <p className="text-center text-gray-600 my-4">{selectedOption === "Infra" ? "$29.99/month" : "$49.99/month"}</p>
              <ul className="text-gray-600 mb-4">
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-green-500">✔</span> 100 Users
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-green-500">✔</span> 100 Passwords Each
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-green-500">✔</span> 24/7 Support
                </li>
              </ul>
              <button
                onClick={() => handleClick("Premium Plan", selectedOption)}
                className="w-full bg-[#074F94] hover:bg-[#0871C9] text-white py-2 rounded-lg transition-colors"
              >
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Price;
