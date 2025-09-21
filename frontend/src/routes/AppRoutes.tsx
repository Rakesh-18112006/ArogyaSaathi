import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import MigrantRegister from "../pages/Migrant/Register";
import OTPVerification from "../pages/Migrant/OTPVerification";
import MigrantLogin from "../pages/Migrant/Login";
import MigrantDashboard from "../pages/Migrant/Dashboard";
import DoctorLogin from "../pages/Doctor/Login";
import DoctorDashboard from "../pages/Doctor/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/migrant/register" element={<MigrantRegister />} />
      <Route path="/migrant/otp" element={<OTPVerification />} />
      <Route path="/migrant/login" element={<MigrantLogin />} />
      <Route path="/migrant/dashboard" element={<MigrantDashboard />} />
      <Route path="/doctor/login" element={<DoctorLogin />} />
      <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
    </Routes>
  );
}
