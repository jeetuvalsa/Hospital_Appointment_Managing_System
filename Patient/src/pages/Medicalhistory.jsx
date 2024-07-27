import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/authpatient";

const Medicalhistory = () => {
  const { patientData } = useAuth();
  const [patientHistory, setPatientHistory] = useState([]);
  //   console.log(patientData.age);
  const medicalHistory = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/patient/details`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        // console.log(responseData.data);

        const sortedMedicalHistory = responseData.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setPatientHistory(sortedMedicalHistory);
      }
    } catch (error) {
      console.log("Error  getting patient data History: " + error);
    }
  };

  useEffect(() => {
    medicalHistory();
  }, []);
  return (
    <div className="w-full min-h-screen flex flex-col items-start justify-start pt-10 px-4 md:px-10 gap-10 bg-black/10">
    {patientHistory.map((item, index) => (
      <div
        key={index}
        className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-black"
      >
        <div className="flex items-center p-4 flex-wrap md:flex-nowrap">
          <img
            className="h-12 w-12 rounded-full mr-4"
            src={item.doctorImage}
            alt="user-profile"
          />
          <div className="flex-1">
            <p className="text-md md:text-lg font-bold text-nowrap">{item.doctorName}</p>
            <p className="text-xs md:text-sm text-muted">{item.doctorSpecialization}</p>
          </div>
          <p className="text-sm md:text-md font-medium mt-2 md:mt-0">
            {new Date(item.date).toLocaleString()}
          </p>
        </div>
  
        <img
          className="w-full border-t border-b border-black"
          src={item.image}
          alt="post-image"
        />
  
        <div className="p-4">
          <p className="mb-3 text-sm md:text-md">
            <span className="font-bold">Department:</span> {item.doctorDepartment}
          </p>
          <p className="text-xs md:text-sm font-bold">
            Descriptions:{" "}
            <pre className="text-wrap mt-1">{item.description}</pre>
          </p>
        </div>
      </div>
    ))}
  </div>
  
  );
};

export default Medicalhistory;
