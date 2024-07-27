import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CheckAppointment = () => {
  const [allDoctors, setAllDoctors] = useState([]);

  const allDoctordata = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/patient/all/doctorDetails`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data.data);
        await setAllDoctors(data.data);
      }
    } catch (error) {
      console.log(
        "An error occurred while authenticating all doctordata",
        error
      );
    }
  };
  useEffect(() => {
    allDoctordata();
  }, []);
  return (
    <div className="w-full min-h-screen bg-black/10 pt-10 px-4 md:px-20 flex items-start justify-start gap-6 flex-wrap">
  {allDoctors.map((item, index) => (
    <div
      key={index}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 py-5 bg-white flex flex-col items-center justify-center rounded-lg shadow-md"
    >
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden">
        <img
          src={item.image}
          className="w-full h-full object-cover object-center"
          alt=""
        />
      </div>
      <h1 className="text-lg mt-4 text-center font-semibold">
        Name:
        <span className="uppercase font-normal ml-2">{item.name}</span>
      </h1>
      <h1 className="text-lg mt-2 text-center font-semibold">
        Specialization:
        <span className="uppercase font-normal ml-2">{item.specialization}</span>
      </h1>
      <h1 className="text-lg mt-2 text-center font-semibold">
        Department:
        <span className="uppercase font-normal ml-2">{item.department}</span>
      </h1>
      <h1 className="text-lg mt-2 text-center font-semibold mb-4">
        Mobile No:
        <span className="uppercase font-normal ml-2">{item.mobileNumber}</span>
      </h1>
      <Link to={`/create/appointment/${item._id}`}>
        <h1 className="text-lg font-semibold bg-green-500 border border-black w-fit text-white px-4 py-2 rounded-xl">
          Book
        </h1>
      </Link>
    </div>
  ))}
</div>

  );
};

export default CheckAppointment;
