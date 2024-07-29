import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import AppointmentsPage from "./pages/AppointmentsPage";
import CompletedAppointmentsPage from "./pages/CompletedAppointmentsPage";
import AllPatients from "./pages/AllPatients";
import Logout from "./components/Logout";
import PatientHistory from "./components/PatientHistory";
import CreatePatientPost from "./components/CreatePatientPost";
import StatusPage from "./components/StatusPage";

const App = () => {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/madhujeet/valsa/register/me" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/status/all" element={<StatusPage />} />
        <Route
          path="/complete-appointments"
          element={<CompletedAppointmentsPage />}
        />
        <Route path="/all-patients" element={<AllPatients />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/patient/history/:patientId"
          element={<PatientHistory />}
        />
        <Route path="/create/post/:patientId" element={<CreatePatientPost />} />
      </Routes>
    </div>
  );
};

export default App;
