import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const Request: React.FC = () => {
  let location = useLocation();
  const [type, setType] = useState<string>("");
  const [env, setEnv] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    algorithm: "",
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEnvDropDown, setShowEnvDropDown] = useState(false);

  let options = ["Demo Product", "Basic Plan", "Pro Plan", "Premium Plan"];
  let envoptions = ["Linux", "SAAS"];

  useEffect(() => {
    if (!location.state) {
      setType("Demo Product");
      setEnv("Linux");
    } else {
      setType(location.state.planType);
      setEnv(location.state.env);
    }
  }, [location.state]);

  const handleFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return formData.email.includes("@") && formData.username.trim() !== "";
  };

  const handleOptionClick = (option: string) => {
    setType(option);
    setShowDropdown(false);
  };

  const handleEnvType = (type: string) => {
    setEnv(type);
    setShowEnvDropDown(false);
  };
  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("The form data = ", formData);
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center pt-16 ml-10">
        <div className="max-w-[500px] px-10 py-10 rounded-3xl bg-white border-2 border-gray-100">
          <p className="font-medium text-lg text-gray-500 mt-4 text-center">
            Please provide the following information to set up a dedicated
            server tailored to your needs.
          </p>
          <div className="mt-8">
            <form onSubmit={handlerSubmit}>
              <div className="flex flex-col">
                <label className="text-lg font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormData}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your Email"
                  required
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-lg font-medium">Username</label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleFormData}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-lg font-medium">Algorithm</label>
                <select
                  name="algorithm"
                  value={formData.algorithm}
                  onChange={handleFormData}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent appearance-none"
                  required
                >
                  <option value="RSA">RSA</option>
                  <option value="ASA">ASA</option>
                </select>
              </div>
              <div className="flex flex-col mt-4 relative">
                <label className="text-lg font-medium">Environment</label>
                <input
                  value={env}
                  onClick={() => setShowEnvDropDown(!showEnvDropDown)}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent cursor-pointer"
                  readOnly
                />
                {showEnvDropDown && (
                  <div className="absolute top-full mt-2 w-full border border-gray-100 bg-white rounded-lg shadow-lg z-10">
                    {envoptions.map((envi) => (
                      <div
                        key={envi}
                        onClick={() => handleEnvType(envi)}
                        className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        <span>{envi}</span>
                        {envi === env && (
                          <FaCheck className="text-purple-500" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col mt-4 relative">
                <label className="text-lg font-medium">Product Type</label>
                <input
                  value={type}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent cursor-pointer"
                  readOnly
                />
                {showDropdown && (
                  <div className="absolute top-full mt-2 w-full border border-gray-100 bg-white rounded-lg shadow-lg z-10">
                    {options.map((option) => (
                      <div
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        <span>{option}</span>
                        {option === type && (
                          <FaCheck className="text-purple-500" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-8 flex flex-col gap-y-4">
                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className={`active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 rounded-xl text-white font-bold text-lg ${
                    isFormValid()
                      ? "bg-[#AA7DFF] hover:bg-[#C49DFF]"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Request a demo
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Request;
