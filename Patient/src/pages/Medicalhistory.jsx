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
    <div className="w-full min-h-screen flex flex-col items-start  justify-start pt-10  gap-10 bg-black/10">
      {patientHistory.map((item, index) => (
        <div
          key={index}
          className="w-[30vw] mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-black"
        >
          <div className="flex items-center p-4 ">
            <img
              className="h-12 w-12 rounded-full mr-4"
              src={item.doctorImage}
              alt="user-profile"
            />
            <div>
              <p className="text-lg font-bold text-nowrap">{item.doctorName}</p>
              <p className="text-sm text-muted">{item.doctorSpecialization}</p>
            </div>
            <p className="text-md font-medium ml-52">
              {new Date(item.date).toLocaleString()}
            </p>
          </div>

          <img
            className="w-full border-t border-b border-black"
            src={item.image}
            alt="post-image"
          />

          <div className="p-4">
            <p className="mb-3">
              <span className="font-bold">Deparment:</span>{" "}
              {item.doctorDepartment}
            </p>
            <p className="text-sm  font-bold">
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
