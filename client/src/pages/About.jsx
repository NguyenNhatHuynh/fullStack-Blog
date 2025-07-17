import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-[#020b19] text-white p-4 md:p-10 2xl:p-28">
      <div className="mt-10">
        <h2 className="text-3xl font-semibold mb-6">About Us</h2>
        <p className="mb-4">Welcome to BlogXDev, your go-to platform for the latest in tech and development. We are passionate about sharing knowledge and innovations in the world of coding, design, and more.</p>
        <h3 className="text-2xl font-semibold mt-6 mb-4">Our Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-4 rounded">
            <h4 className="font-semibold">Xoan Dev</h4>
            <p>Founder & Lead Developer</p>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h4 className="font-semibold">Jane Doe</h4>
            <p>Content Writer</p>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h4 className="font-semibold">John Smith</h4>
            <p>UI/UX Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;