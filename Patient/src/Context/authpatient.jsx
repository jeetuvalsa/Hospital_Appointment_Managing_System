import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(true);
  const [patientData, setpatientData] = useState(null);
  const isAuthenticated = !!patientData;

  const auhtentication = async () => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/patient/patientOne`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data.data);
        await setpatientData(data.data);
      }
      setisLoading(false);
    } catch (error) {
      console.log("An error occurred while authenticating doctordata", error);
      // setisLoading(false);
    }
  };

  const logoutPatient = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/patient/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        toast.error(responseData.message)
        setpatientData(null);
      }
    } catch (error) {
      console.log("An error occurred while logging out", error);
    }
  };
  useEffect(() => {
    auhtentication();
  }, [isAuthenticated]);
  return (
    <AuthContext.Provider
      value={{ patientData, auhtentication, logoutPatient,isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
