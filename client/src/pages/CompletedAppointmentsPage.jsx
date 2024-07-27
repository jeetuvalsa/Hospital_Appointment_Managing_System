import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";

const AppointmentsPage = () => {
  const { doctorData, getAppointmentdata, allCompletedAppointments } =
    useAuth();

  const removeAppointment = async (id) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/doctor/remove/appointment/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        // console.log("remove Appointment: " + responseData);
        toast.error(responseData.message);
        await getAppointmentdata();
      }
      // else {
      //   console.log(responseData);
      // }
    } catch (error) {
      console.log("error removing appointment", error);
    }
  };

  useEffect(() => {
    getAppointmentdata();
  }, []);
  return (
    <div className="w-full h-screen bg-black/10 p-10 flex flex-col gap-7">
      {allCompletedAppointments && allCompletedAppointments.length > 0 ? (
        allCompletedAppointments.map((item, index) => (
          <div
            key={index}
            className="w-full py-10 bg-white px-5 flex items-center gap-20 border border-black rounded-lg"
          >
            <h1 className="text-lg font-medium w-32">
              Token No: {item.tokenNo}
            </h1>
            <h1 className="text-lg font-medium w-[25vw]">
              Patient Name: {item.name}
            </h1>
            <h1 className="text-lg font-medium w-24">Age: {item.age}</h1>
            <h1 className="text-lg font-medium w-60">
              Mobile No: {item.mobileNumber}
            </h1>

            <h1
              onClick={() => removeAppointment(item._id)}
              className="text-lg ml-10 border border-black cursor-pointer px-4 py-0.5 rounded-lg bg-black text-white font-medium"
            >
              Remove
            </h1>
          </div>
        ))
      ) : (
        <h1 className="text-xl font-semibold text-center">No Appointments</h1>
      )}
    </div>
  );
};

export default AppointmentsPage;
