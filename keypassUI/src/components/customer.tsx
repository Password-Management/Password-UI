import React, { useState, useEffect } from "react";
import ImageTest from "../assets/customer.jpg";
import YAML from "yaml";
import { CheckLicense, GetCustomer } from "../services/customer";
import { MdOutlineFileDownload } from "react-icons/md";

const Customer: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  sessionStorage.setItem("customerLogin", "true");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [showDialogBox, setShowDialogBox] = useState(false);
  const [jsonData, setJsonData] = useState({
    email: "",
    name: "",
    algorithm: "",
    masterId: "",
    producttype: "",
  });

  useEffect(() => {
    const licenseSubmitted = sessionStorage.getItem("licenseSubmitted");
    if (licenseSubmitted === "true") {
      setSubmitted(true);
      sessionStorage.setItem("customerLogin", "true");
      getConfigValue();
    }
  }, []);

  const handleConfigDownload = () => {
    const yamlData = YAML.stringify(jsonData);
    const blob = new Blob([yamlData], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "config.yml";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await CheckLicense(inputValue);
    if (response.status !== "SUCCESS") {
      setError("Wrong License ID");
    } else {
      localStorage.clear();
      setSubmitted(true);
      sessionStorage.setItem("licenseSubmitted", "true");
      sessionStorage.setItem("licenseId", inputValue);
      localStorage.setItem("email", response.result.email);
    }
  };

  const getConfigValue = async () => {
    let email = localStorage.getItem("email");
    if (email !== null) {
      const response = await GetCustomer(email);
      if (response.status === "SUCCESS") {
        setJsonData({
          email: response.result.email,
          name: response.result.name,
          algorithm: response.result.algorithm,
          masterId: response.result.master_id,
          producttype: response.result.plan,
        });
      }
    }
  };

  if (!submitted) {
    return (
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="p-6 w-96 bg-gray-300 rounded-lg shadow-lg"
        >
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Enter License ID
          </h2>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your LicenseId"
            className="w-full p-3 border rounded mb-4 focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            className="w-full text-white px-4 py-2 rounded bg-[#074F94] hover:bg-[#0871C9] transition duration-200"
          >
            Submit
          </button>
          {error && (
            <p className="text-red-500 mt-2 text-sm text-center">{error}</p>
          )}
        </form>
      </div>
    );
  }

  if (showDialogBox) {
    return (
      <section className="flex justify-center items-center h-screen">
        <div className="relative w-full max-w-sm p-6 rounded-lg shadow-lg bg-gray-200">
          <button
            onClick={() => setShowDialogBox(false)}
            className="absolute top-2 right-1 text-gray-600 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center mt-2">
            Config Ready for Download!
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            Your customized product and configuration files are now available.
          </p>
          <button
            onClick={handleConfigDownload}
            className="w-full px-4 py-2 mb-2 bg-[#074F94] hover:bg-[#0871C9] text-white rounded transition duration-200"
          >
            <MdOutlineFileDownload /> Download
          </button>
          
          <p className="text-gray-600 mt-6 text-center">
            Please download this config before starting the product.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row rounded-2xl max-w-4xl p-5 md:p-10 items-center bg-white">
        <div className="w-full md:w-1/2 hidden md:block">
          <img
            className="rounded-2xl object-cover"
            src={ImageTest}
            alt="Customer"
          />
        </div>
        <div className="w-full md:w-1/2 px-6 md:px-8 flex flex-col justify-center items-center">
          <div className="p-6 rounded text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Product Ready for Download!
            </h2>
            <p className="text-gray-700 mb-6">
            Your customized product zip and configuration are ready for download. Before proceeding, visit the <strong>EnvCheck</strong> section to verify and install any required tools for your operating system.
            </p>
            <div className="space-y-4 w-full flex justify-center">
              <button
                onClick={handleConfigDownload}
                className="flex items-center justify-center w-full md:w-auto bg-[#074F94] hover:bg-[#0871C9] py-3 px-7 text-white rounded-md transition-colors"
              >
                <MdOutlineFileDownload className="mr-2" /> Download Config
              </button>
            </div>
            <div className="space-y-4 w-full flex justify-center">
              <button
                onClick={handleConfigDownload}
                className="flex items-center justify-center w-full mt-2 md:w-auto bg-[#074F94] hover:bg-[#0871C9] py-3 px-6 text-white rounded-md transition-colors"
              >
                <MdOutlineFileDownload className="mr-2" /> Download KeyPass
              </button>
            </div>
            <p className="text-gray-600 mt-6">
              Once downloaded, start your server and experience the seamless
              performance of your setup. Thank you for choosing us!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customer;
