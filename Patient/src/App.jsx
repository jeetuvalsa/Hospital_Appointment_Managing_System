import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import RegisterPatientPage from "./pages/RegisterPatientPage";
import LoginPatientPage from "./pages/LoginPatientPage";
import PatientHomePage from "./pages/PatientHomePage";
import Logout from "./components/Logout";
import CheckAppointment from "./pages/CheckAppointment";
import CreateAppointments from "./pages/CreateAppointments";
import Medicalhistory from "./pages/Medicalhistory";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<RegisterPatientPage />} />
        <Route path="/login" element={<LoginPatientPage />} />
        <Route path="/homepage" element={<PatientHomePage />} />
        <Route path="/create" element={<CheckAppointment />} />
        <Route
          path="/create/appointment/:doctorId"
          element={<CreateAppointments />}
        />
        <Route path="/medical/history" element={<Medicalhistory />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default App;
