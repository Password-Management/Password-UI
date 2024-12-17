import React from "react";
import ImageTest from "../assets/about.jpg";

const About: React.FC = () => {
  return (
    <>
      <section className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col md:flex-row rounded-2xl max-w-4xl p-5 md:p-10 items-center">
          <div className="w-full md:w-1/2 hidden md:block">
            <img
              className="rounded-2xl object-cover"
              src={ImageTest}
              alt="Login"
            />
          </div>
          <div className="w-full md:w-1/2 px-6 md:px-8">
            <h2 className="font-bold text-3xl text-black text-center md:text-left">
              About Us
            </h2>
            <br />
            <h2 className="font-bold text-3xl text-black text-center md:text-left">
              At KeyPass
            </h2>
            <br />
            <h3>
              We prioritize your data security with state-of-the-art encryption
              technology. We understand the importance of keeping your passwords
              safe and secure, which is why we employ RSA encryption to ensure
              that your sensitive information is stored in an encrypted format.
              RSA encryption is a proven, robust method used worldwide to
              protect digital data, making sure only authorized users can access
              their stored passwords.
            </h3>
            <br />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;