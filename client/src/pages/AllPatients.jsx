import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";

const AllPatients = () => {
  const { allPatientsData, patientData, setPatientData } = useAuth();

  const removePatient = async (id) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/doctor/remove/patient/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        // console.log(responseData);
        toast.success(responseData.message);
      }
    } catch (error) {
      console.log("Error removing patient", error);
    }
  };

  const memoizedAllPatients = useMemo(() => allPatientsData, []);
  useEffect(() => {
    memoizedAllPatients();

    // // Set up interval to fetch orders every 40 seconds
    const intervalId = setInterval(memoizedAllPatients, 8000); // 8 seconds

    return () => clearInterval(intervalId);
  }, [memoizedAllPatients]);

  // useEffect(() => {
  //   allPatientsData();
  // }, []);
  return (
    <div className="w-full h-screen bg-black/10 p-5 md:p-10 flex flex-col gap-5 md:gap-7">
  {patientData && patientData.length > 0 ? (
    patientData.map((item, index) => (
      <div
        key={index}
        className="w-full py-5 md:py-10 bg-white px-3 md:px-5 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-20 border border-black rounded-lg"
      >
        <h1 className="text-lg font-medium w-full md:w-[17vw]">
          Patient Name: {item.name}
        </h1>
        <h1 className="text-lg font-medium w-full md:w-24">Age: {item.age}</h1>
        <h1 className="text-lg font-medium w-full md:w-52">
          Mobile No: {item.mobileNumber}
        </h1>
        <h1 className="text-md font-medium w-full md:w-[21vw]">
          Address: {item.address}
        </h1>
        <Link to={`/patient/history/${item._id}`} className="w-full md:w-auto">
          <h1 className="text-md border border-black text-nowrap px-3 py-0.5 bg-black text-white font-semibold rounded-lg select-none cursor-pointer text-center md:text-left">
            Medical History
          </h1>
        </Link>
        <Link to={`/create/post/${item._id}`} className="w-full md:w-auto">
          <h1 className="text-md border border-black px-3 py-0.5 bg-green-500 text-white font-semibold rounded-lg select-none cursor-pointer text-center md:text-left">
            Add
          </h1>
        </Link>
        <h1
          onClick={() => removePatient(item._id)}
          className="text-md border border-black px-3 py-0.5 bg-red-500 text-white font-semibold rounded-lg select-none cursor-pointer w-full md:w-auto text-center md:text-left"
        >
          Remove
        </h1>
      </div>
    ))
  ) : (
    <h1 className="text-xl font-semibold text-center">No Patient Found</h1>
  )}
</div>

  );
};

export default AllPatients;
