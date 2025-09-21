import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "./DoctorLogin.css";

export default function DoctorLogin() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      toast.success(t("doctor.login.success"));
      navigate("/doctor/dashboard");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || t("doctor.login.invalidCredentials")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="doctor-login-container">
      <div className="doctor-login-content">
        <motion.div
          className="doctor-login-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="doctor-login-form-section">
            <motion.div
              className="doctor-login-header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="doctor-login-logo">
                <i className="fas fa-stethoscope doctor-login-logo-icon"></i>
                <h1 className="doctor-login-logo-text">{t("appName")}</h1>
              </div>
              <h2 className="doctor-login-title">{t("doctor.login.title")}</h2>
              <p className="doctor-login-subtitle">
                {t("doctor.login.subtitle")}
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="doctor-login-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="doctor-login-input-group">
                <label className="doctor-login-input-label">
                  <i className="fas fa-envelope"></i>
                  {t("doctor.login.email")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("doctor.login.emailPlaceholder")}
                  className="doctor-login-input"
                  required
                />
              </div>

              <div className="doctor-login-input-group">
                <label className="doctor-login-input-label">
                  <i className="fas fa-lock"></i>
                  {t("password")}
                </label>
                <div className="doctor-login-password-toggle">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("doctor.login.passwordPlaceholder")}
                    className="doctor-login-input"
                    required
                  />
                  <span
                    className="doctor-login-password-toggle-icon"
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

              <div className="doctor-login-links">
                <Link
                  to="/doctor/forgot-password"
                  className="doctor-login-link"
                >
                  <i className="fas fa-key"></i>
                  {t("forgotPassword")}
                </Link>
              </div>

              <motion.button
                type="submit"
                className="doctor-login-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-circle-notch doctor-login-loading"></i>
                    {t("doctor.login.processing")}
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i>
                    {t("login")}
                  </>
                )}
              </motion.button>
            </motion.form>

            <motion.div
              className="doctor-login-divider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="doctor-login-divider-text">
                {t("doctor.login.or")}
              </span>
            </motion.div>

            <motion.div
              className="doctor-login-register-link"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {t("doctor.login.noAccount")}{" "}
              <Link to="/doctor/register" className="doctor-login-link">
                {t("register")}
              </Link>
            </motion.div>
          </div>

          <div className="doctor-login-image-section">
            <motion.div
              className="doctor-login-image-content"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <i className="fas fa-user-md doctor-login-image-icon"></i>
              <h3 className="doctor-login-image-title">
                {t("doctor.login.welcome")}
              </h3>
              <p className="doctor-login-image-subtitle">
                {t("doctor.login.accessFeatures")}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
