import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authpatient";

const Logout = () => {
  const { logoutPatient, patientData } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    logoutPatient();
    navigate("/login");
  }, [patientData]);
  return;
};

export default Logout;
