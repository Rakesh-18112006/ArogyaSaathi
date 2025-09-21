import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { t } from "i18next";
import { motion } from "framer-motion";
import "./Registration.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    dob: "",
    gender: "",
    language: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axiosInstance.post("/migrants/register", form);
      toast.success(t("otpVerification.enterOTP"));
      navigate("/migrant/otp", { state: { phone: form.phone } });
    } catch (err: any) {
      toast.error(err.response?.data?.message || t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            className="registration-form-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="registration-input-group">
              <label className="registration-input-label">
                {t("migrantRegister.name")}
              </label>
              <input
                name="name"
                placeholder={t("migrantRegister.name")}
                onChange={handleChange}
                className="registration-input"
                required
              />
            </div>

            <div className="registration-input-group">
              <label className="registration-input-label">
                {t("phoneNumber")}
              </label>
              <input
                name="phone"
                type="tel"
                placeholder={t("phoneNumber")}
                onChange={handleChange}
                className="registration-input"
                required
              />
            </div>

            <div className="registration-input-group">
              <label className="registration-input-label">
                {t("password")}
              </label>
              <div className="registration-password-toggle">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={t("password")}
                  onChange={handleChange}
                  className="registration-input"
                  required
                />
                <span
                  className="registration-password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            className="registration-form-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="registration-input-group">
              <label className="registration-input-label">
                {t("migrantRegister.dob")}
              </label>
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                className="registration-input"
                required
              />
            </div>

            <div className="registration-input-group">
              <label className="registration-input-label">
                {t("migrantRegister.gender")}
              </label>
              <select
                name="gender"
                onChange={handleChange}
                className="registration-select"
                required
              >
                <option value="">{t("migrantRegister.selectGender")}</option>
                <option value="male">{t("migrantRegister.male")}</option>
                <option value="female">{t("migrantRegister.female")}</option>
                <option value="other">{t("migrantRegister.other")}</option>
              </select>
            </div>

            <div className="registration-input-group">
              <label className="registration-input-label">
                {t("migrantRegister.language")}
              </label>
              <select
                name="language"
                onChange={handleChange}
                className="registration-select"
                required
              >
                <option value="">{t("migrantRegister.selectLanguage")}</option>
                <option value="hindi">हिंदी (Hindi)</option>
                <option value="english">English</option>
                <option value="telugu">తెలుగు (Telugu)</option>
                <option value="bengali">বাংলা (Bengali)</option>
                <option value="tamil">தமிழ் (Tamil)</option>
              </select>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            className="registration-form-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="registration-input-group">
              <h3
                className="registration-input-label"
                style={{ textAlign: "center", marginBottom: "20px" }}
              >
                <i
                  className="fas fa-check-circle"
                  style={{
                    color: "#10b981",
                    fontSize: "2rem",
                    marginBottom: "10px",
                  }}
                ></i>
                <br />
                {t("migrantRegister.reviewInfo")}
              </h3>

              <div
                style={{
                  backgroundColor: "#f9fafb",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              >
                <p>
                  <strong>{t("migrantRegister.name")}:</strong> {form.name}
                </p>
                <p>
                  <strong>{t("phoneNumber")}:</strong> {form.phone}
                </p>
                <p>
                  <strong>{t("migrantRegister.dob")}:</strong> {form.dob}
                </p>
                <p>
                  <strong>{t("migrantRegister.gender")}:</strong> {form.gender}
                </p>
                <p>
                  <strong>{t("migrantRegister.language")}:</strong>{" "}
                  {form.language}
                </p>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-content">
        <div className="registration-header">
          <div className="registration-logo">
            <i className="fas fa-heartbeat registration-logo-icon"></i>
            <h1 className="registration-logo-text">{t("appName")}</h1>
          </div>
          <h2 className="registration-title">{t("migrantRegister.title")}</h2>
          <p className="registration-subtitle">
            {t("migrantRegister.subtitle")}
          </p>
        </div>

        <div className="registration-card">
          <div className="registration-form-section">
            <div className="registration-progress">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`registration-progress-step ${
                    currentStep > step
                      ? "completed"
                      : currentStep === step
                      ? "active"
                      : ""
                  }`}
                >
                  {currentStep > step ? <i className="fas fa-check"></i> : step}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="registration-form">
              {renderStep()}

              <div className="registration-form-row">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="registration-button"
                    style={{
                      background:
                        "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
                    }}
                  >
                    <i className="fas fa-arrow-left"></i>
                    {t("back")}
                  </button>
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="registration-button"
                  >
                    {t("next")}
                    <i className="fas fa-arrow-right"></i>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="registration-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <i className="fas fa-circle-notch registration-loading"></i>
                        {t("register.processing")}
                      </>
                    ) : (
                      <>
                        <i className="fas fa-user-plus"></i>
                        {t("register")}
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>

            <div className="registration-login-link">
              {t("register.alreadyHaveAccount")}{" "}
              <Link to="/migrant/login">{t("login")}</Link>
            </div>
          </div>

          <div className="registration-image-section">
            <div className="registration-image-content">
              <i className="fas fa-users registration-image-icon"></i>
              <h3 className="registration-image-title">
                {t("migrantRegister.joinCommunity")}
              </h3>
              <p className="registration-image-subtitle">
                {t("migrantRegister.benefits")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
