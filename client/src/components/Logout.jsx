import React, { useEffect } from "react";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const { logoutDoctor, doctorData } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    logoutDoctor();
    
    navigate("/");
  }, [doctorData]);
  return;
};

export default Logout;
