import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Analytics from "./Analytics";
import { Html5QrcodeScanner } from "html5-qrcode";
import { motion } from "framer-motion";
import "./DoctorDashboard.css";
import axiosInstance from "../../api/axiosInstance";

// Default values for demonstration
const DEFAULT_DOCTOR = {
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@hospital.com",
  specialization: "Cardiologist",
  hospital: "City General Hospital",
  experience: "8 years",
  phone: "+1 (555) 123-4567",
};

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [migrantId, setMigrantId] = useState("");
  const [requestId, setRequestId] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [records, setRecords] = useState<any[]>([]);
  const [migrant, setMigrant] = useState<any>(null);
  const [scanning, setScanning] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  // Initialize QR scanner when scanning = true
  useEffect(() => {
    if (scanning && !scannerRef.current) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render(
        (decodedText: string) => {
          try {
            const parsed = JSON.parse(decodedText);
            if (parsed.uniqueId) {
              setMigrantId(parsed.uniqueId);
              setMigrant({
                name: parsed.name || "",
                dob: parsed.dob || "",
                phone: parsed.phone || "",
              });
              toast.success("QR Code scanned successfully!");
            } else {
              setMigrantId(decodedText);
              toast.success("QR Code scanned (plain text)!");
            }
          } catch {
            setMigrantId(decodedText);
            toast.success("QR Code scanned (plain text)!");
          }

          setScanning(false);
          scanner.clear().catch(() => {});
          scannerRef.current = null;
        },
        (errorMessage: string) => {
          console.warn("QR Scan error:", errorMessage);
        }
      );

      scannerRef.current = scanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [scanning]);

  // Request OTP
  const handleRequestOtp = async () => {
    try {
      const res = await axiosInstance.post("/access/request", { migrantId });
      setRequestId(res.data.requestId);
      setRequestSent(true);
      toast.success(res.data.message || "OTP sent to migrant's phone");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "OTP request failed");
    }
  };

  // Verify OTP and fetch records
  const handleVerifyOtp = async () => {
    try {
      const res = await axiosInstance.post("/access/verify", {
        requestId,
        otp,
      });

      toast.success(res.data.message || "OTP verified successfully!");
      setOtpVerified(true);

      // Fetch records after successful OTP verification
      fetchRecords();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

  // Fetch health records
  const fetchRecords = async () => {
    try {
      const res = await axiosInstance.get(`/access/records/${migrantId}`);
      setRecords(res.data.records);

      // Set migrant data from records if available
      if (res.data.records.length > 0) {
        setMigrant({
          name: res.data.records[0]?.migrantName || "",
          phone: res.data.records[0]?.migrantPhone || "",
          dob: res.data.records[0]?.migrantDob || "",
          bloodGroup: res.data.records[0]?.bloodGroup || "N/A",
          allergies: res.data.records[0]?.allergies || "None",
          emergencyContact: res.data.records[0]?.emergencyContact || "N/A",
        });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch records");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <motion.div
              className="doctor-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="doctor-card-title">
                <i className="fas fa-qrcode"></i>
                Access Migrant Records
              </h3>

              {!migrantId && !scanning && (
                <motion.button
                  onClick={() => setScanning(true)}
                  className="doctor-btn doctor-btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-camera"></i>
                  Scan QR Code
                </motion.button>
              )}

              {scanning && (
                <div className="doctor-qr-section">
                  <div className="doctor-qr-scanner">
                    <div id="reader" className="w-full h-64"></div>
                  </div>
                  <motion.button
                    onClick={() => setScanning(false)}
                    className="doctor-btn doctor-btn-danger"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fas fa-times"></i>
                    Cancel Scan
                  </motion.button>
                </div>
              )}

              {migrantId && !requestSent && (
                <motion.button
                  onClick={handleRequestOtp}
                  className="doctor-btn doctor-btn-primary mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <i className="fas fa-paper-plane"></i>
                  Request OTP
                </motion.button>
              )}

              {requestSent && !otpVerified && (
                <motion.div
                  className="doctor-otp-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="doctor-input-group">
                    <label className="doctor-input-label">Enter OTP</label>
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP sent to migrant"
                      className="doctor-input"
                    />
                  </div>
                  <motion.button
                    onClick={handleVerifyOtp}
                    className="doctor-btn doctor-btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fas fa-check-circle"></i>
                    Verify OTP
                  </motion.button>
                </motion.div>
              )}
            </motion.div>

            {/* Migrant Profile */}
            {migrant && otpVerified && (
              <motion.div
                className="doctor-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="doctor-card-title">
                  <i className="fas fa-user"></i>
                  Migrant Profile
                </h3>
                <div className="doctor-profile-grid">
                  <div className="doctor-profile-item">
                    <span className="doctor-profile-label">Name</span>
                    <span className="doctor-profile-value">{migrant.name}</span>
                  </div>
                  <div className="doctor-profile-item">
                    <span className="doctor-profile-label">Phone</span>
                    <span className="doctor-profile-value">
                      {migrant.phone}
                    </span>
                  </div>
                  <div className="doctor-profile-item">
                    <span className="doctor-profile-label">Date of Birth</span>
                    <span className="doctor-profile-value">
                      {migrant.dob
                        ? new Date(migrant.dob).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="doctor-profile-item">
                    <span className="doctor-profile-label">Blood Group</span>
                    <span className="doctor-profile-value">
                      {migrant.bloodGroup || "N/A"}
                    </span>
                  </div>
                  <div className="doctor-profile-item">
                    <span className="doctor-profile-label">Allergies</span>
                    <span className="doctor-profile-value">
                      {migrant.allergies || "None"}
                    </span>
                  </div>
                  <div className="doctor-profile-item">
                    <span className="doctor-profile-label">
                      Emergency Contact
                    </span>
                    <span className="doctor-profile-value">
                      {migrant.emergencyContact || "N/A"}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Health Records */}
            {otpVerified && records.length > 0 && (
              <motion.div
                className="doctor-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="doctor-card-title">
                  <i className="fas fa-file-medical"></i>
                  Health Records
                </h3>
                <div className="doctor-records-grid">
                  {records.map((record, index) => (
                    <motion.div
                      key={record._id || index}
                      className="doctor-record-card"
                      whileHover={{ scale: 1.03 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <div className="doctor-record-header">
                        <h4 className="doctor-record-title">{record.title}</h4>
                        <span className="doctor-record-date">
                          {new Date(record.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="doctor-record-details">{record.content}</p>
                      <div className="doctor-record-type">{record.type}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Analytics */}
            <Analytics />
          </>
        );

      case "profile":
        return (
          <motion.div
            className="doctor-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="doctor-card-title">
              <i className="fas fa-user-md"></i>
              Doctor Profile
            </h3>
            <div className="doctor-profile-grid">
              <div className="doctor-profile-item">
                <span className="doctor-profile-label">Name</span>
                <span className="doctor-profile-value">
                  {user?.name || DEFAULT_DOCTOR.name}
                </span>
              </div>
              <div className="doctor-profile-item">
                <span className="doctor-profile-label">Email</span>
                <span className="doctor-profile-value">
                  {user?.email || DEFAULT_DOCTOR.email}
                </span>
              </div>
              <div className="doctor-profile-item">
                <span className="doctor-profile-label">Specialization</span>
                <span className="doctor-profile-value">
                  {DEFAULT_DOCTOR.specialization}
                </span>
              </div>
              <div className="doctor-profile-item">
                <span className="doctor-profile-label">Hospital</span>
                <span className="doctor-profile-value">
                  {DEFAULT_DOCTOR.hospital}
                </span>
              </div>
              <div className="doctor-profile-item">
                <span className="doctor-profile-label">Experience</span>
                <span className="doctor-profile-value">
                  {DEFAULT_DOCTOR.experience}
                </span>
              </div>
              <div className="doctor-profile-item">
                <span className="doctor-profile-label">Phone</span>
                <span className="doctor-profile-value">
                  {DEFAULT_DOCTOR.phone}
                </span>
              </div>
            </div>
          </motion.div>
        );

      default:
        return (
          <div className="doctor-card">
            <h3 className="doctor-card-title">Welcome to your dashboard</h3>
            <p>Select a section from the menu to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="doctor-dashboard-container">
      <motion.div
        className="doctor-sidebar"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="doctor-sidebar-header">
          <div className="doctor-sidebar-logo">
            <i className="fas fa-heartbeat doctor-sidebar-logo-icon"></i>
            <span className="doctor-sidebar-logo-text">ArogyaSaathi</span>
          </div>

          <div
            className="doctor-user-profile"
            onClick={() => setActiveTab("profile")}
          >
            <div className="doctor-user-avatar">
              {getInitials(user?.name || DEFAULT_DOCTOR.name)}
            </div>
            <div className="doctor-user-info">
              <div className="doctor-user-name">
                {user?.name || DEFAULT_DOCTOR.name}
              </div>
              <div className="doctor-user-role">
                {DEFAULT_DOCTOR.specialization}
              </div>
            </div>
          </div>
        </div>

        <div className="doctor-nav">
          <div
            className={`doctor-nav-item ${
              activeTab === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <div className="doctor-nav-icon">
              <i className="fas fa-home"></i>
            </div>
            <div className="doctor-nav-text">Dashboard</div>
          </div>

          <div
            className={`doctor-nav-item ${
              activeTab === "patients" ? "active" : ""
            }`}
            onClick={() => setActiveTab("patients")}
          >
            <div className="doctor-nav-icon">
              <i className="fas fa-user-injured"></i>
            </div>
            <div className="doctor-nav-text">Patients</div>
          </div>

          <div
            className={`doctor-nav-item ${
              activeTab === "appointments" ? "active" : ""
            }`}
            onClick={() => setActiveTab("appointments")}
          >
            <div className="doctor-nav-icon">
              <i className="fas fa-calendar-check"></i>
            </div>
            <div className="doctor-nav-text">Appointments</div>
          </div>

          <div
            className={`doctor-nav-item ${
              activeTab === "records" ? "active" : ""
            }`}
            onClick={() => setActiveTab("records")}
          >
            <div className="doctor-nav-icon">
              <i className="fas fa-file-medical"></i>
            </div>
            <div className="doctor-nav-text">Health Records</div>
          </div>
        </div>

        <div className="doctor-sidebar-footer">
          <div className="doctor-logout-btn" onClick={logout}>
            <div className="doctor-nav-icon">
              <i className="fas fa-sign-out-alt"></i>
            </div>
            <div className="doctor-nav-text">Logout</div>
          </div>
        </div>
      </motion.div>

      <div className="doctor-main">
        <div className="doctor-header">
          <h1 className="doctor-title">
            {activeTab === "dashboard"
              ? "Doctor Dashboard"
              : activeTab === "profile"
              ? "My Profile"
              : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <div className="doctor-mobile-menu-btn">
            <i className="fas fa-bars"></i>
          </div>
        </div>

        <div className="doctor-content">{renderContent()}</div>
      </div>
    </div>
  );
}
