import React, { useState } from "react";
import OsImage from "../assets/env.jpg";
import { CheckOsScript } from "../services/customer";
const EnvCheck: React.FC = () => {
  const [selectedOS, setSelectedOS] = useState("");

  const handleDownload = async () => {
    const response = await CheckOsScript(selectedOS);
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "keypasscheck.sh");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col md:flex-row rounded-2xl max-w-4xl p-5 md:p-10 items-center bg-white">
          <div className="flex flex-col items-center sm:w-1/2">
            <img
              src={OsImage}
              alt="Operating Systems"
              className="rounded-2xl object-cover"
            />
          </div>
          <div className="flex flex-col items-center sm:w-1/2">
            <h2 className="text-2xl font-semibold mb-2">
              Choose Your Operating System
            </h2>
            <select
              value={selectedOS}
              onChange={(e) => setSelectedOS(e.target.value)}
              className="p-2 border rounded-md w-64 mb-4"
            >
              <option value="">Select OS</option>
              <option value="macos">macOS</option>
              <option value="linux">Linux</option>
            </select>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-[#074F94] hover:bg-[#0871C9] text-white rounded-md"
            >
              Download Script
            </button>
            <p className="text-xs mt-2">
              Ensure you have the necessary dependencies installed for smooth
              operation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnvCheck;
