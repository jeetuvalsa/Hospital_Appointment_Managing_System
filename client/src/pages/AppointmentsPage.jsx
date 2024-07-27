import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/auth";

const AppointmentsPage = () => {
  const { doctorData, getAppointmentdata, allAppointments, setStatus, status } =
    useAuth();

  const handleStatusChange = async (id, status) => {
    setStatus((prev) => ({ ...prev, [id]: status }));

    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/doctor/change/${id}/${status}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      // console.log("status Changed: " + responseData);
      await getAppointmentdata();
    }
  };

  const memorizeAppointments = useMemo(() => getAppointmentdata, []);
  useEffect(() => {
    memorizeAppointments();

    // // Set up interval to fetch orders every 40 seconds
    const intervalId = setInterval(memorizeAppointments, 10000); // 10 seconds

    // // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [memorizeAppointments]);

  // useEffect(() => {
  //   getAppointmentdata();
  // }, []);
  return (
    <div className="w-full h-screen bg-black/10 p-5 md:p-10 flex flex-col gap-5 md:gap-7">
  {allAppointments && allAppointments.length > 0 ? (
    allAppointments.map((item, index) => (
      <div
        key={index}
        className="w-full py-5 md:py-10 bg-white px-3 md:px-5 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-20 border border-black rounded-lg"
      >
        <h1 className="text-lg font-medium w-full md:w-32">
          Token No: {item.tokenNo}
        </h1>
        <h1 className="text-lg font-medium w-full md:w-[25vw]">
          Patient Name: {item.name}
        </h1>
        <h1 className="text-lg font-medium w-full md:w-24">Age: {item.age}</h1>
        <h1 className="text-lg font-medium w-full md:w-60">
          Mobile No: {item.mobileNumber}
        </h1>
        <select
          id="status"
          name="status"
          value={status[item._id] || "waiting"}
          onChange={(e) => handleStatusChange(item._id, e.target.value)}
          className="block w-full md:w-32 outline-none mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-black focus:ring focus:ring-black"
        >
          <option value="waiting">Waiting</option>
          <option value="in room">In Room</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    ))
  ) : (
    <h1 className="text-xl font-semibold text-center">No Appointments</h1>
  )}
</div>

  );
};

export default AppointmentsPage;
