import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { auhtentication } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({
    mobileNumber: Number,
    password: "",
  });
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        // console.log(responseData);
        await auhtentication();
        toast.success(responseData.message);
        navigate("/homepage");
      }
    } catch (error) {
      console.log("Failed to handle click on login", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-black">
  <div className="bg-white dark:bg-card shadow-lg rounded-lg p-8 w-full max-w-md">
    <h2 className="text-2xl font-bold text-black text-center mb-6">
      Doctor Login
    </h2>
    <form className="space-y-4">
      <div>
        <label
          htmlFor="mobileNumber"
          className="block text-sm font-medium text-black"
        >
          Mobile Number
        </label>
        <input
          type="tel"
          id="mobileNumber"
          value={data.mobileNumber}
          onChange={(e) =>
            setData((prev) => ({ ...prev, mobileNumber: e.target.value }))
          }
          placeholder="Enter your mobile number"
          className="w-full px-3 py-2 mt-1 text-black border border-black rounded-md focus:outline-none focus:ring focus:ring-black"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-black"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={data.password}
          onChange={(e) =>
            setData((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="Enter your password"
          className="w-full px-3 py-2 mt-1 text-black border border-black rounded-md focus:outline-none focus:ring focus:ring-black"
        />
      </div>
      <button
        type="submit"
        onClick={handleClick}
        className="w-full bg-black text-white py-2 rounded-md hover:bg-black/80 transition-colors duration-300"
      >
        Login
      </button>
      <h1 className="text-md mt-4 text-center">
        Don't have an account?{" "}
        <Link className="text-blue-500 font-medium">
          Register
        </Link>
      </h1>
    </form>
  </div>
</div>

  );
};

export default LoginPage;
