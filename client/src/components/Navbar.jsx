import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

const Navbar = () => {
  const { doctorData, isLoading } = useAuth();
  // console.log(doctorData, isLoading);
  if(doctorData)
  return (
    <nav className=" shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-2">
        <div className="w-60">
          <Link>
            <img
              className="w-full h-full object-cover object-center"
              src="client\public\logo.png"
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
            to="/appointments"
            className="text-black font-semibold hover:text-black/80"
          >
            Appointments
          </Link>
          <Link
            to="/complete-appointments"
            className="text-black font-semibold hover:text-black/80"
          >
            Completed Appointments
          </Link>
          <Link
            to="/all-patients"
            className="text-black font-semibold hover:text-black/80"
          >
            All Patients
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
