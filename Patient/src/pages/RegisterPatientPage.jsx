import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPatientPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    mobileNumber: Number,
    address: "",
    age: Number,
    password: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/patient/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        // console.log(responseData);
        toast.success(responseData.message);
        navigate("/login");
      }
      // else {
      //   console.log(responseData);
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="bg-background text-primary-foreground min-h-screen flex flex-col justify-center items-center">
      <form
        className="bg-card shadow-lg p-8 rounded-lg w-full md:w-1/2 lg:w-1/3"
        s
      >
        <h2 className="text-2xl font-bold mb-4">Patient Registration Form</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="name">
            Patient Full Name
          </label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={(e) =>
              setData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter patient full name"
            className="w-full mt-1 p-2 rounded-md border border-input focus:outline-none focus:ring focus:ring-ring"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="mobileNumber">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobileNumber"
            value={data.mobileNumber}
            onChange={(e) =>
              setData((prev) => ({ ...prev, mobileNumber: e.target.value }))
            }
            placeholder="Enter mobile number"
            className="w-full mt-1 p-2 rounded-md border border-input focus:outline-none focus:ring focus:ring-ring"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="address">
            Address
          </label>
          <textarea
            value={data.specialization}
            onChange={(e) =>
              setData((prev) => ({ ...prev, address: e.target.value }))
            }
            id="specialization"
            placeholder="Enter Address"
            rows="3"
            className="w-full resize-none mt-1 p-2  rounded-md border border-input focus:outline-none focus:ring focus:ring-ring"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="age">
            Age
          </label>
          <input
            type="number"
            value={data.age}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                age: e.target.value,
              }))
            }
            id="age"
            placeholder="Enter age"
            className="w-full mt-1 p-2 rounded-md border border-input focus:outline-none focus:ring focus:ring-ring"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={(e) =>
              setData((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Enter strong password"
            className="w-full mt-1 p-2 rounded-md border border-input focus:outline-none focus:ring focus:ring-ring"
          />
        </div>

        <button
          type="submit"
          onClick={handleClick}
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-black/80 transition-colors"
        >
          Submit
        </button>
        <h1 className="text-md mt-4">
          you already have an account ?{" "}
          <Link to="/login" className="text-blue-500 font-medium">
            Login
          </Link>
        </h1>
      </form>
    </div>
  );
};

export default RegisterPatientPage;
