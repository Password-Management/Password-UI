import React, { useEffect, useState } from "react";
import logo from "../assets/nav.jpg";
import { CreateContract, GetCustomer } from "../services/customer";
import { useNavigate } from "react-router-dom";
import { VscDebugContinue } from "react-icons/vsc";
const Success: React.FC = () => {
  let navigate = useNavigate();
  let email = localStorage.getItem("email");
  const [userInfo, setUserInfo] = useState({
    id: "",
    email: "",
    env: "",
    plan: "",
    algorithm: "",
  });

  const handleSubmit = async () => {
    sessionStorage.clear();
    if (email !== null) {
      const resp = await CreateContract(email)
      console.log(resp)
      localStorage.setItem("id", userInfo.id)
    }
    navigate("/contract");
  };
  const handleUserInfo = async () => {
    if (email !== null) {
      console.log("the email = ", email);
      const response = await GetCustomer(email);
      setUserInfo({
        id: response.result.id,
        email: response.result.email,
        env: response.result.plaform,
        plan: response.result.plan,
        algorithm: response.result.algorithm,
      });
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    handleUserInfo();
  }, []);
  return (
    <>
      <div className="min-h-[20vh] w-full flex flex-col items-center justify-center pt-13 px-4">
        <img className="w-32 h-auto mb-4 sm:w-48" src={logo} alt="Logo" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2 sm:text-3xl">
          KeyPass
        </h2>
        <p className="text-center text-gray-600 max-w-md sm:text-lg">
          We have sent an email to{" "}
          <strong className="text-black">{userInfo.email}</strong> regarding the
          setup of your{" "}
          <strong className="text-black">{userInfo.algorithm}</strong>{" "}
          encryption type and subscription to the{" "}
          <strong className="text-black">{userInfo.plan}</strong>. The email
          includes an attachment containing the contract. Please review the
          document and reply confirming that everything is in order. Once
          confirmed, we will proceed with setting up your product. Credentials
          will be shared with you to download your ZIP file securely.
          <br />
          <strong className="text-black">
            Thank you for choosing our services!
          </strong>
        </p>
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center w-full md:w-auto bg-[#074F94] hover:bg-[#0871C9] py-2 px-4 text-white rounded-md transition-colors mt-3"
        >
          <VscDebugContinue className="mr-2" /> Countinue
        </button>
      </div>
    </>
  );
};

export default Success;
