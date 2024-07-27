import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    specialization: "",
    yearsOfExperience: Number,
    department: "",
    mobileNumber: Number,
    password: "",
    image: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("specialization", data.specialization);
    formdata.append("yearsOfExperience", data.yearsOfExperience);
    formdata.append("department", data.department);
    formdata.append("mobileNumber", data.mobileNumber);
    formdata.append("password", data.password);
    formdata.append("image", data.image);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/register`,
        {
          method: "POST",
          credentials: "include",
          body: formdata,
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        // console.log(responseData);
        toast.success(responseData.message);
        navigate("/login");
      }
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
        <h2 className="text-2xl font-bold mb-4">Doctor Registration Form</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="image">
            Profile Picture
          </label>
          <div className="flex items-center mt-1">
            <input
              type="file"
              id="image"
              name="image"
              onChange={(e) =>
                setData((prev) => ({ ...prev, image: e.target.files[0] }))
              }
              className=" pl-3 py-2"
              accept="image/*"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="name">
            Doctor Full Name
          </label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={(e) =>
              setData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter doctor full name"
            className="w-full mt-1 p-2 rounded-md border border-input focus:outline-none focus:ring focus:ring-ring"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="specialization">
            Specialization
          </label>
          <input
            type="text"
            value={data.specialization}
            onChange={(e) =>
              setData((prev) => ({ ...prev, specialization: e.target.value }))
            }
            id="specialization"
            placeholder="Enter specialization"
            className="w-full mt-1 p-2 rounded-md border border-input focus:outline-none focus:ring focus:ring-ring"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium"
            htmlFor="yearsOfExperience"
          >
            Years Of Experience
          </label>
          <input
            type="number"
            value={data.yearsOfExperience}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                yearsOfExperience: e.target.value,
              }))
            }
            id="yearsOfExperience"
            placeholder="Enter years of experience"
            className="w-full mt-1 p-2 rounded-md border border-input focus:outline-none focus:ring focus:ring-ring"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="department">
            Department
          </label>
          <input
            type="text"
            id="department"
            value={data.department}
            onChange={(e) =>
              setData((prev) => ({ ...prev, department: e.target.value }))
            }
            placeholder="Enter department"
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

export default RegisterPage;
