import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="landing-container">
      <motion.div
        className="landing-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="landing-logo" variants={itemVariants}>
          <i className="fas fa-heartbeat landing-logo-icon"></i>
          <h1 className="landing-logo-text">{t("appName")}</h1>
        </motion.div>

        <motion.div className="landing-hero" variants={itemVariants}>
          <h1 className="landing-hero-title">{t("landing.heroTitle")}</h1>
          <p className="landing-hero-subtitle">{t("landing.heroSubtitle")}</p>
        </motion.div>

        <motion.div className="landing-card" variants={itemVariants}>
          <h2 className="landing-card-title">{t("landing.welcome")}</h2>

          <div className="landing-language-selector">
            <select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="te">తెలుగు (Telugu)</option>
            </select>
          </div>

          <div className="landing-button-group">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="landing-btn landing-btn-secondary"
              onClick={() => navigate("/migrant/register")}
            >
              <i className="fas fa-user"></i>
              {t("userType.migrant")}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="landing-btn landing-btn-primary"
              onClick={() => navigate("/doctor/login")}
            >
              <i className="fas fa-user-md"></i>
              {t("userType.doctor")}
            </motion.button>
          </div>
        </motion.div>

        <motion.div className="landing-features" variants={itemVariants}>
          <div className="landing-feature">
            <i className="fas fa-hospital landing-feature-icon"></i>
            <h3 className="landing-feature-title">{t("landing.feature1")}</h3>
          </div>

          <div className="landing-feature">
            <i className="fas fa-notes-medical landing-feature-icon"></i>
            <h3 className="landing-feature-title">{t("landing.feature2")}</h3>
          </div>

          <div className="landing-feature">
            <i className="fas fa-calendar-check landing-feature-icon"></i>
            <h3 className="landing-feature-title">{t("landing.feature3")}</h3>
          </div>
        </motion.div>

        <motion.div className="landing-footer" variants={itemVariants}>
          <p>{t("landing.footer")}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
