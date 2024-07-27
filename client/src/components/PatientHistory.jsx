import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PatientHistory = () => {
  const { patientId } = useParams();
  const [medicalHistory, setMedicalHistory] = useState([]);

  const patientHistoryData = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/doctor/patient/${patientId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        // console.log(responseData.data.medicalHistory);

        const sortedMedicalHistory = responseData.data.medicalHistory.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setMedicalHistory(sortedMedicalHistory);

        // await setMedicalHistory(responseData.data.medicalHistory);
      } else {
        setMedicalHistory([]);
      }
    } catch (error) {
      console.log("Error in particular patient data: ", error);
    }
  };

  const removePost = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/post/remove/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        toast.error(responseData.message);
        // console.log("Post removed: " + responseData);
        patientHistoryData();
      }
    } catch (error) {
      console.log("Error in particular patient data Post removal: ", error);
    }
  };

  useEffect(() => {
    patientHistoryData();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-start  justify-start pt-10  gap-10 bg-black/10">
      {medicalHistory.map((item, index) => (
        <div
          key={index}
          className="w-[30vw] relative mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-black"
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
            <h1
              onClick={() => removePost(item._id)}
              className="text-md border px-3 py-1 select-none cursor-pointer rounded-xl bg-red-500 text-white w-fit absolute right-10 bottom-10"
            >
              Remove
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientHistory;
