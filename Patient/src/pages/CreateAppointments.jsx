import React, { useState } from "react";
import { useAuth } from "../Context/authpatient";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateAppointments = () => {
  const { patientData } = useAuth();
  const navigate = useNavigate();
  // console.log(patientData);
  const { doctorId } = useParams();
  const [sendingData, setSendingData] = useState({
    name: "",
    mobileNumber: Number,
    age: Number,
  });

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/patient/create/appointment/${doctorId}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sendingData),
        }
      );
      const responsedata = await response.json();
      if (response.ok) {
        // console.log(responsedata);
        toast.success(responsedata.message);
        navigate(-1);
      } else {
        toast.error(responsedata.message);
        // console.log("Error: " + responsedata);
      }
    } catch (error) {
      console.log("Appointment creating Error: " + error);
    }
  };
  return (
    <div className="bg-background text- p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">User Information Form</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="Name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={sendingData.name}
            onChange={(e) =>
              setSendingData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter your name"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:ring-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Mobile Number" className="block text-sm font-medium">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={sendingData.mobileNumber}
            onChange={(e) =>
              setSendingData((prev) => ({
                ...prev,
                mobileNumber: e.target.value,
              }))
            }
            placeholder="Enter your mobile number"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:ring-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={sendingData.age}
            onChange={(e) =>
              setSendingData((prev) => ({ ...prev, age: e.target.value }))
            }
            placeholder="Enter your age"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:ring-black"
          />
        </div>

        <button
          type="submit"
          onClick={handleAppointment}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-black/80 focus:outline-none focus:ring focus:ring-black"
        >
          Create Appointment
        </button>
      </form>
    </div>
  );
};

export default CreateAppointments;
