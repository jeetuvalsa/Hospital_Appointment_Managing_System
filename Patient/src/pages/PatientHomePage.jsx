import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/authpatient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PatientHomePage = () => {
  const { patientData, isLoading, auhtentication } = useAuth();
  const navigate = useNavigate();
  const [editBtn, setEditBtn] = useState(true);

  // console.log(isLoading);

  const [updateData, setUpdateData] = useState({
    name: "",
    mobileNumber: Number,
    address: "",
    age: Number,
    password: "",
  });
  useEffect(() => {
    if (!patientData && !isLoading) {
      navigate("/");
    }
  }, [patientData, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!patientData) {
    return <div>Loading...</div>;
  }
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/patient/edit`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        // console.log("done");
        await auhtentication();
        toast.success(responseData.message);
        setEditBtn(true);
      }
      // else {
      //   // console.log(responseData);
      //   toast.error(responseData.message);
      // }
    } catch (error) {
      console.log("An error occurred while updating", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center px-12 justify-center md:justify-between p-4 md:p-8 rounded-lg shadow-lg">
      <div className="flex flex-col items-center md:items-start pl-24">
        <h2 className="text-xl font-bold">{patientData.name}</h2>
        <p className="text-md py-0.5 mt-1">
          <span className="font-medium">Address: </span>
          {patientData.address}
        </p>
        <p className="text-md py-0.5">
          <span className="font-medium">Age: </span>
          {patientData.age} years
        </p>
        <p className="text-md py-0.5">
          <span className="font-medium">Mobile Number:</span>
          {patientData.mobileNumber}
        </p>
        <p className="text-md py-0.5">
          <span className="font-medium">Department:</span>
          {patientData.department}
        </p>
        {editBtn ? (
          <h1
            onClick={() => setEditBtn(false)}
            className="bg-black text-white hover:bg-black/80 mt-2 cursor-pointer rounded-md px-4 py-2"
          >
            Edit Profile
          </h1>
        ) : (
          <div className="mt-4 bg-card text-card-foreground p-4 rounded-lg w-full">
            <h3 className="text-lg font-bold mb-2">Edit Profile</h3>
            <form>
              <label htmlFor="name" className="block text-sm mb-1">
                Full name:
              </label>
              <input
                type="text"
                id="name"
                value={updateData.name}
                onChange={(e) =>
                  setUpdateData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter full name"
                className="w-full bg-input text-input border border-black rounded-md px-2 py-1 mb-2"
              />

              <label htmlFor="address" className="block text-sm mb-1">
                address:
              </label>
              <textarea
                id="address"
                rows="3"
                value={updateData.address}
                onChange={(e) =>
                  setUpdateData((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                placeholder="Enter Specialization"
                className="w-full bg-input resize-none text-input border border-black rounded-md px-2 py-1 mb-2"
              ></textarea>

              <label htmlFor="age" className="block text-sm mb-1">
                Age:
              </label>
              <input
                type="number"
                id="age"
                value={updateData.age}
                onChange={(e) =>
                  setUpdateData((prev) => ({
                    ...prev,
                    age: e.target.value,
                  }))
                }
                placeholder="Enter years of experience"
                className="w-full bg-input text-input border border-black rounded-md px-2 py-1 mb-2"
              />

              <label htmlFor="mobileNumber" className="block text-sm mb-1">
                Mobile Number:
              </label>
              <input
                type="tel"
                id="mobileNumber"
                value={updateData.mobileNumber}
                onChange={(e) =>
                  setUpdateData((prev) => ({
                    ...prev,
                    mobileNumber: e.target.value,
                  }))
                }
                placeholder="Enter mobile number"
                className="w-full bg-input text-input border border-black rounded-md px-2 py-1 mb-4"
              />
              <label htmlFor="password" className="block text-sm mb-1">
                New Password:
              </label>
              <input
                type="password"
                id="password"
                value={updateData.password}
                onChange={(e) =>
                  setUpdateData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                placeholder="Enter new password"
                className="w-full bg-input text-input border border-black rounded-md px-2 py-1 mb-4"
              />

              <button
                type="submit"
                onClick={handleUpdate}
                className="bg-black text-white hover:bg-black/80 rounded-md px-4 py-2"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientHomePage;
