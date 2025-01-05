import { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import { AcceptContract, GetContract } from "../services/customer";
import { RiContractLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";
const Contract = () => {
  let navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [contract, setContract] = useState<string>("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [licenseid, setLicenseId] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const getContract = async (id: string) => {
    const response = await GetContract(id);
    console.log(response);
    setContract(response);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(licenseid);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleAccept = async () => {
    if (id !== null) {
      const response = await AcceptContract(id);
      if (response.status === "SUCCESS") {
        localStorage.setItem("licenseiId", response.result.license_id);
        setLicenseId(response.result.license_id);
        setShowPopUp(true);
      }
    }
  };

  const handleCustomerNavigation = () => {
    navigate("/customer");
  };

  useEffect(() => {
    if (id !== null) {
      getContract(id);
    }
  }, []);
  if (showPopUp) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md text-center max-w-md">
          <p className="text-black mb-4">
            Please ensure that your License ID is securely stored, as it serves
            as your unique access credential for the customer login portal. If
            you misplace or forget your License ID, kindly contact us for
            assistance in retrieving it. Safeguarding this information is
            essential for uninterrupted access to your account.
          </p>
          <div className="flex items-center justify-center mb-6">
            <code className="bg-gray-200 px-1 py-2 rounded text-sm">
              {licenseid}
            </code>
            <button
              onClick={handleCopy}
              className="ml-3 bg-[#074F94] hover:bg-[#0871C9] text-white px-4 py-2 rounded  transition duration-200"
            >
              <FaRegCopy/>
            </button>
          </div>
          <button
            onClick={handleCustomerNavigation}
            className="bg-[#074F94] hover:bg-[#0871C9] text-white px-6 py-2 rounded transition duration-200"
          >
            Go to Customer Portal
          </button>

          <button
            onClick={ () => {setShowPopUp(false)}}
            className="bg-[#074F94] hover:bg-[#0871C9] text-white px-6 py-2 rounded ml-2 transition duration-200"
          >
            Close
          </button>
        </div>
        {isCopied && (
          <div className="absolute bottom-10 bg-green-500 text-white px-6 py-2 rounded shadow-md">
            License ID copied to clipboard!
          </div>
        )}
      </div>
    );
  }
  return (
    <>
      <div className="prose ml-3">
        <Markdown>{contract}</Markdown>
      </div>
      <button
        onClick={handleAccept}
        className="ml-10 mb-3 flex items-center justify-center w-full md:w-auto bg-[#074F94] hover:bg-[#0871C9] py-2 px-4 text-white rounded-md transition-colors mt-3"
      >
        <RiContractLine className="mr-3" /> Accept
      </button>
    </>
  );
};

export default Contract;
