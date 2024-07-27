import React, { useEffect, useMemo } from "react";
import { useAuth } from "../context/auth";

const StatusPage = () => {
  const { doctorData, getAppointmentdata, allAppointments, setStatus, status } =
    useAuth();

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
    <div className="w-full h-screen bg-black/10 p-10 flex flex-col gap-7">
      {allAppointments && allAppointments.length > 0 ? (
        allAppointments.map((item, index) => (
          <div
            key={index}
            className={`w-full py-10 px-5 flex items-center justify-around gap-20 border border-black rounded-lg ${
              index === 0 ? "bg-green-400" : "bg-red-400"
            }`}
          >
            <h1 className="text-lg font-medium w-32">
              Token No: {item.tokenNo}
            </h1>
            <h1 className="text-lg font-medium w-[25vw]">
              Patient Name: {item.name}
            </h1>
            <h1 className="text-lg font-medium w-24">{item.status}</h1>
          </div>
        ))
      ) : (
        <h1 className="text-xl font-semibold text-center">No Appointments</h1>
      )}
    </div>
  );
};

export default StatusPage;
