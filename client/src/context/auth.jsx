import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [doctorData, setDoctordata] = useState(null);
  const [allDoctors, setAllDoctors] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [allAppointments, setAllAppointments] = useState([]);
  const [allCompletedAppointments, setAllCompletedAppointments] = useState([]);
  const [patientData, setPatientData] = useState([]);

  const [status, setStatus] = useState({});
  const isAuthenticated = !!doctorData;

  const auhtentication = async () => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/doctorOne`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data.data);
        await setDoctordata(data.data);
      }
      setisLoading(false);
    } catch (error) {
      console.log("An error occurred while authenticating doctordata", error);
      // setisLoading(false);
    }
  };
  const allDoctordata = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/all`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        await setAllDoctors(data.data);
      } else {
        // console.log(data);
      }
    } catch (error) {
      console.log(
        "An error occurred while authenticating all doctordata",
        error
      );
    }
  };

  const logoutDoctor = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        toast.error(responseData.message);
        setDoctordata(null);
      }
    } catch (error) {
      console.log("An error occurred while logging out", error);
    }
  };
  const getAppointmentdata = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/all/appointment`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      // console.log(responseData.data);
      // console.log(responseData.completed);
      await setAllAppointments(responseData.data);
      await setAllCompletedAppointments(responseData.completed);

      const initialStatuses = {};
      responseData.data.forEach((appointment) => {
        initialStatuses[appointment._id] = appointment.status || "waiting";
      });
      setStatus(initialStatuses);
    }
  };

  const allPatientsData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/all/patients`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data.data);
        await setPatientData(data.data);
        // console.log(patientData);
      } else {
        setPatientData([]);
      }
    } catch (error) {
      console.log("Error in all patients: ", error);
    }
  };

  useEffect(() => {
    auhtentication();
  }, [isAuthenticated]);
  return (
    <AuthContext.Provider
      value={{
        doctorData,
        isLoading,
        auhtentication,
        allDoctordata,
        allDoctors,
        logoutDoctor,
        getAppointmentdata,
        allAppointments,
        allCompletedAppointments,
        setStatus,
        status,
        allPatientsData,
        setPatientData,
        patientData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
