import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import "./Dashboard.css";

interface Migrant {
  _id: string;
  name: string;
  phone: string;
  dob: string;
  gender: string;
  language: string;
  qrData: string;
  uniqueId: string;
}

interface HealthRecord {
  id: string;
  title: string;
  date: string;
  description: string;
  type: string;
}

export default function Dashboard() {
  const [migrant, setMigrant] = useState<Migrant | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Dummy health records data
  const dummyRecords: HealthRecord[] = [
    {
      id: "1",
      title: "General Checkup",
      date: "2023-10-15",
      description: "Routine health examination, all vitals normal",
      type: "Examination",
    },
    {
      id: "2",
      title: "Blood Test Results",
      date: "2023-09-22",
      description: "Complete blood count, cholesterol levels checked",
      type: "Lab Results",
    },
    {
      id: "3",
      title: "Vaccination Record",
      date: "2023-08-10",
      description: "COVID-19 booster shot administered",
      type: "Vaccination",
    },
  ];

  // Dummy stats data
  const statsData = [
    {
      label: t("migrant.dashboard.myRecords"),
      value: "12",
      icon: "fas fa-file-medical",
      color: "blue",
    },
    {
      label: t("migrant.dashboard.upcomingAppointments"),
      value: "2",
      icon: "fas fa-calendar-check",
      color: "green",
    },
    {
      label: t("migrant.dashboard.medications"),
      value: "5",
      icon: "fas fa-pills",
      color: "purple",
    },
    {
      label: t("migrant.dashboard.recentVisits"),
      value: "3",
      icon: "fas fa-hospital",
      color: "orange",
    },
  ];

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth && savedAuth !== "undefined") {
      try {
        const parsed = JSON.parse(savedAuth);
        if (parsed.migrant) {
          setMigrant(parsed.migrant);
        }
      } catch (err) {
        console.error("Error parsing auth data:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    navigate("/migrant/login");
  };

  if (!migrant) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">{t("loading")}</p>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <motion.div
              className="dashboard-stats-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  className="dashboard-stat-card"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`dashboard-stat-icon ${stat.color}`}>
                    <i className={stat.icon}></i>
                  </div>
                  <div className="dashboard-stat-info">
                    <div className="dashboard-stat-value">{stat.value}</div>
                    <div className="dashboard-stat-label">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="dashboard-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="dashboard-card-title">
                <i className="fas fa-qrcode"></i>
                {t("migrant.dashboard.qrCode")}
              </h3>
              <div className="dashboard-qr-container">
                <p className="dashboard-qr-title">
                  {t("migrant.dashboard.yourQrCode")}
                </p>
                <img
                  src={migrant.qrData}
                  alt={t("migrant.dashboard.qrCode")}
                  className="dashboard-qr-code"
                />
                <div className="dashboard-qr-id">{migrant.uniqueId}</div>
              </div>
            </motion.div>

            <motion.div
              className="dashboard-section-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <i className="fas fa-clock"></i>
              {t("migrant.dashboard.recentRecords")}
            </motion.div>

            <motion.div
              className="dashboard-records-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {dummyRecords.map((record, index) => (
                <motion.div
                  key={record.id}
                  className="dashboard-record-card"
                  whileHover={{ scale: 1.03 }}
                
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="dashboard-record-header">
                    <h4 className="dashboard-record-title">{record.title}</h4>
                    <span className="dashboard-record-date">{record.date}</span>
                  </div>
                  <p className="dashboard-record-details">
                    {record.description}
                  </p>
                  <div className="dashboard-record-type">{record.type}</div>
                </motion.div>
              ))}
            </motion.div>
          </>
        );

      case "profile":
        return (
          <motion.div
            className="dashboard-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="dashboard-card-title">
              <i className="fas fa-user"></i>
              {t("profile")}
            </h3>
            <div className="dashboard-profile-grid">
              <div className="dashboard-profile-item">
                <span className="dashboard-profile-label">
                  {t("migrantRegister.name")}
                </span>
                <span className="dashboard-profile-value">{migrant.name}</span>
              </div>
              <div className="dashboard-profile-item">
                <span className="dashboard-profile-label">
                  {t("phoneNumber")}
                </span>
                <span className="dashboard-profile-value">{migrant.phone}</span>
              </div>
              <div className="dashboard-profile-item">
                <span className="dashboard-profile-label">
                  {t("migrantRegister.gender")}
                </span>
                <span className="dashboard-profile-value">
                  {t(`migrantRegister.${migrant.gender.toLowerCase()}`)}
                </span>
              </div>
              <div className="dashboard-profile-item">
                <span className="dashboard-profile-label">
                  {t("migrantRegister.dob")}
                </span>
                <span className="dashboard-profile-value">
                  {new Date(migrant.dob).toLocaleDateString()}
                </span>
              </div>
              <div className="dashboard-profile-item">
                <span className="dashboard-profile-label">
                  {t("migrantRegister.language")}
                </span>
                <span className="dashboard-profile-value">
                  {migrant.language}
                </span>
              </div>
              <div className="dashboard-profile-item">
                <span className="dashboard-profile-label">ID</span>
                <span className="dashboard-profile-value">
                  {migrant.uniqueId}
                </span>
              </div>
            </div>
          </motion.div>
        );

      case "records":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="dashboard-section-title">
              <i className="fas fa-file-medical"></i>
              {t("migrant.dashboard.myRecords")}
            </div>

            <div className="dashboard-records-grid">
              {dummyRecords.map((record, index) => (
                <motion.div
                  key={record.id}
                  className="dashboard-record-card"
                  whileHover={{ scale: 1.03 }}
          
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="dashboard-record-header">
                    <h4 className="dashboard-record-title">{record.title}</h4>
                    <span className="dashboard-record-date">{record.date}</span>
                  </div>
                  <p className="dashboard-record-details">
                    {record.description}
                  </p>
                  <div className="dashboard-record-type">{record.type}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return (
          <div className="dashboard-card">
            <h3 className="dashboard-card-title">Welcome to your dashboard</h3>
            <p>Select a section from the menu to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <motion.div
        className="dashboard-sidebar"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="dashboard-sidebar-header">
          <div className="dashboard-sidebar-logo">
            <i className="fas fa-heartbeat dashboard-sidebar-logo-icon"></i>
            <span className="dashboard-sidebar-logo-text">{t("appName")}</span>
          </div>

          <div
            className="dashboard-user-profile"
            onClick={() => setActiveTab("profile")}
          >
            <div className="dashboard-user-avatar">
              {getInitials(migrant.name)}
            </div>
            <div className="dashboard-user-info">
              <div className="dashboard-user-name">{migrant.name}</div>
              <div className="dashboard-user-role">{t("userType.migrant")}</div>
            </div>
          </div>
        </div>

        <div className="dashboard-nav">
          <div
            className={`dashboard-nav-item ${
              activeTab === "overview" ? "active" : ""
            }`}
            onClick={() => setActiveTab("overview")}
          >
            <div className="dashboard-nav-icon">
              <i className="fas fa-home"></i>
            </div>
            <div className="dashboard-nav-text">{t("home")}</div>
          </div>

          <div
            className={`dashboard-nav-item ${
              activeTab === "records" ? "active" : ""
            }`}
            onClick={() => setActiveTab("records")}
          >
            <div className="dashboard-nav-icon">
              <i className="fas fa-file-medical"></i>
            </div>
            <div className="dashboard-nav-text">
              {t("migrant.dashboard.myRecords")}
            </div>
          </div>

          <div
            className={`dashboard-nav-item ${
              activeTab === "appointments" ? "active" : ""
            }`}
            onClick={() => setActiveTab("appointments")}
          >
            <div className="dashboard-nav-icon">
              <i className="fas fa-calendar-check"></i>
            </div>
            <div className="dashboard-nav-text">
              {t("migrant.dashboard.upcomingAppointments")}
            </div>
          </div>

          <div
            className={`dashboard-nav-item ${
              activeTab === "medications" ? "active" : ""
            }`}
            onClick={() => setActiveTab("medications")}
          >
            <div className="dashboard-nav-icon">
              <i className="fas fa-pills"></i>
            </div>
            <div className="dashboard-nav-text">
              {t("migrant.dashboard.medications")}
            </div>
          </div>
        </div>

        <div className="dashboard-sidebar-footer">
          <div className="dashboard-logout-btn" onClick={handleLogout}>
            <div className="dashboard-nav-icon">
              <i className="fas fa-sign-out-alt"></i>
            </div>
            <div className="dashboard-nav-text">{t("logout")}</div>
          </div>
        </div>
      </motion.div>

      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            {t(`migrant.dashboard.${activeTab}`)}
          </h1>
          <div
            className="dashboard-mobile-menu-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <i className="fas fa-bars"></i>
          </div>
        </div>

        <div className="dashboard-content">{renderContent()}</div>
      </div>
    </div>
  );
}
