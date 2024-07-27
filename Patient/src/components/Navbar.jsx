import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/authpatient.jsx";

const Navbar = () => {
  const { patientData } = useAuth();
  if (patientData)
    return (
      <nav className=" shadow-lg">
        <div className="container mx-auto flex justify-between items-center py-2">
          <div className="w-60">
            <Link>
              <img
                className="w-full h-full object-cover object-center"
                src="\public\logo.png"
                alt=""
              />
            </Link>
          </div>
          <div className="md:flex space-x-10">
            <Link
              to="/homepage"
              className="text-black font-semibold hover:text-black/80"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="text-black font-semibold hover:text-black/80"
            >
              Appointments
            </Link>
            <Link
              to="/medical/history"
              className="text-black font-semibold hover:text-black/80"
            >
              Medical History
            </Link>
            <Link
              to="/logout"
              className="text-black font-semibold hover:text-black/80"
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
    );
};

export default Navbar;
