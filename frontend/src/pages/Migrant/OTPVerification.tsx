import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

export default function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = (location.state as any)?.phone;
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/migrants/verify-otp", { phone, otp });
      toast.success("Verified! Please login.");
      navigate("/migrant/login");
    } catch (err: any) {
      toast.error(err.response.data.message || "Error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-green-700 text-center">
          Verify OTP
        </h2>
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="input"
          required
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Verify
        </button>
      </form>
    </div>
  );
}
