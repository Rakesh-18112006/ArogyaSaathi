import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Language resources
const resources = {
  en: {
    translation: {
      // Common
      appName: "ArogyaSaathi",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      submit: "Submit",
      cancel: "Cancel",
      back: "Back",
      next: "Next",
      save: "Save",
      migrantProfile: "Migrant",
      doctorProfile: "Doctor",
      userType: {
        migrant: "Migrant",
        doctor: "Doctor",
      },

      // Navigation
      home: "Home",
      dashboard: "Dashboard",
      profile: "Profile",
      logout: "Logout",

      // Auth - Common
      login: "Login",
      register: "Register",
      phoneNumber: "Phone Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      forgotPassword: "Forgot Password?",
      otpVerification: "OTP Verification",
      enterOTP: "Enter OTP sent to your phone",
      resendOTP: "Resend OTP",
      verifyOTP: "Verify OTP",
      landing: {
        heroTitle: "Your Health, Our Priority",
        heroSubtitle:
          "Connecting migrants with healthcare services and providing doctors with tools to serve better",
        welcome: "Welcome to ArogyaSaathi",
        feature1: "Health Records",
        feature2: "Doctor Consultations",
        feature3: "Appointment Booking",
        footer: "© 2025 ArogyaSaathi. All rights reserved.",
      },
      // Add these to your translation resources

      // Migrant Registration
      migrantRegister: {
        title: "Migrant Registration",
        subtitle: "Create your account to access healthcare services",
        name: "Full Name",
        age: "Age",
        dob: "Date of Birth",
        language: "Language",
        selectGender: "Select Gender",
        selectLanguage: "Select Preferred Language",
        reviewInfo: "Review Your Information",
        joinCommunity: "Join Our Community",
        benefits:
          "Access healthcare services, track your medical records, and connect with doctors in your preferred language",
        gender: "Gender",
        male: "Male",
        female: "Female",
        other: "Other",
        state: "State",
        city: "City",
        address: "Address",
        occupation: "Occupation",
        emergencyContact: "Emergency Contact",
        registerSuccess: "Registration successful!",
      },

      // Doctor Login/Dashboard
      doctor: {
        login: {
          title: "Doctor Login",
          subtitle: "Access your medical dashboard",
          email: "Email Address",
          emailPlaceholder: "Enter your email",
          passwordPlaceholder: "Enter your password",
          invalidCredentials: "Invalid email or password",
          success: "Login successful!",
          or: "Or",
          noAccount: "Don't have an account?",
          welcome: "Welcome Doctor",
          accessFeatures:
            "Access patient records, manage appointments, and provide healthcare services",
          processing: "Logging in...",
        },
        dashboard: {
          title: "Doctor Dashboard",
          patients: "Patients",
          appointments: "Appointments",
          records: "Health Records",
          analytics: "Analytics",
          newPatients: "New Patients",
          totalPatients: "Total Patients",
          recentRecords: "Recent Records",
        },
        analytics: {
          title: "Analytics",
          patientStatistics: "Patient Statistics",
          diseaseDistribution: "Disease Distribution",
          ageGroups: "Age Groups",
          monthlyTrends: "Monthly Trends",
        },
      },

      // Migrant Dashboard
      migrant: {
        dashboard: {
          overview: "Overview",
          myRecords: "My Health Records",
          upcomingAppointments: "Upcoming Appointments",
          medications: "Current Medications",
          recentVisits: "Recent Hospital Visits",
          healthStatus: "Health Status",
          documents: "Medical Documents",
          qrCode: "QR Code",
          yourQrCode: "Your QR Code",
          recentRecords: "Recent Health Records",
          title: "My Health Portal",
          profile: "Profile",
        },
        records: {
          addRecord: "Add Health Record",
          viewRecord: "View Record",
          deleteRecord: "Delete Record",
          recordType: "Record Type",
          diagnosis: "Diagnosis",
          prescription: "Prescription",
          date: "Date",
          doctor: "Doctor",
          hospital: "Hospital",
        },
      },

      // Health Records
      healthRecord: {
        title: "Health Record",
        type: "Type",
        description: "Description",
        symptoms: "Symptoms",
        diagnosis: "Diagnosis",
        treatment: "Treatment",
        medications: "Medications",
        nextVisit: "Next Visit Date",
        attachments: "Attachments",
      },

      // Errors
      errors: {
        required: "This field is required",
        invalidPhone: "Invalid phone number",
        invalidEmail: "Invalid email address",
        passwordMismatch: "Passwords do not match",
        weakPassword: "Password is too weak",
        serverError: "Server error occurred",
        networkError: "Network error occurred",
      },
    },
  },
  hi: {
    translation: {
      // Common
      appName: "आरोग्य साथी",
      loading: "लोड हो रहा है...",
      error: "त्रुटि",
      success: "सफल",
      submit: "जमा करें",
      cancel: "रद्द करें",
      back: "वापस",
      next: "आगे",
      save: "सहेजें",
      userType: {
        migrant: "प्रवासी",
        doctor: "डॉक्टर",
      },

      // Navigation
      home: "होम",
      dashboard: "डैशबोर्ड",
      profile: "प्रोफाइल",
      logout: "लॉग आउट",

      // Auth - Common
      login: "लॉग इन",
      register: "पंजीकरण",
      phoneNumber: "फोन नंबर",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      forgotPassword: "पासवर्ड भूल गए?",
      otpVerification: "ओटीपी सत्यापन",
      enterOTP: "अपने फोन पर भेजा गया ओटीपी दर्ज करें",
      resendOTP: "ओटीपी पुनः भेजें",
      verifyOTP: "ओटीपी सत्यापित करें",

      // Migrant Registration
      migrantRegister: {
        title: "प्रवासी पंजीकरण",
        name: "पूरा नाम",
        age: "उम्र",
        gender: "लिंग",
        male: "पुरुष",
        female: "महिला",
        other: "अन्य",
        state: "राज्य",
        city: "शहर",
        address: "पता",
        occupation: "व्यवसाय",
        emergencyContact: "आपातकालीन संपर्क",
        registerSuccess: "पंजीकरण सफल!",
      },

      // Doctor Login/Dashboard
      doctor: {
        login: {
          title: "डॉक्टर लॉगिन",
          email: "ईमेल पता",
          invalidCredentials: "अमान्य ईमेल या पासवर्ड",
        },
        dashboard: {
          title: "डॉक्टर डैशबोर्ड",
          patients: "मरीज",
          appointments: "नियुक्तियां",
          records: "स्वास्थ्य रिकॉर्ड",
          analytics: "विश्लेषण",
          newPatients: "नए मरीज",
          totalPatients: "कुल मरीज",
          recentRecords: "हाल के रिकॉर्ड",
        },
        analytics: {
          title: "विश्लेषण",
          patientStatistics: "मरीज सांख्यिकी",
          diseaseDistribution: "बीमारी वितरण",
          ageGroups: "आयु समूह",
          monthlyTrends: "मासिक प्रवृत्तियां",
        },
      },

      // Migrant Dashboard
      migrant: {
        dashboard: {
          title: "मेरा स्वास्थ्य पोर्टल",
          myRecords: "मेरे स्वास्थ्य रिकॉर्ड",
          upcomingAppointments: "आगामी नियुक्तियां",
          medications: "वर्तमान दवाएं",
          recentVisits: "हाल के अस्पताल के दौरे",
          healthStatus: "स्वास्थ्य स्थिति",
          documents: "चिकित्सा दस्तावेज",
        },
        records: {
          addRecord: "स्वास्थ्य रिकॉर्ड जोड़ें",
          viewRecord: "रिकॉर्ड देखें",
          deleteRecord: "रिकॉर्ड हटाएं",
          recordType: "रिकॉर्ड प्रकार",
          diagnosis: "निदान",
          prescription: "नुस्खा",
          date: "तारीख",
          doctor: "डॉक्टर",
          hospital: "अस्पताल",
        },
      },

      // Health Records
      healthRecord: {
        title: "स्वास्थ्य रिकॉर्ड",
        type: "प्रकार",
        description: "विवरण",
        symptoms: "लक्षण",
        diagnosis: "निदान",
        treatment: "उपचार",
        medications: "दवाएं",
        nextVisit: "अगली मुलाकात की तारीख",
        attachments: "संलग्नक",
      },

      // Errors
      errors: {
        required: "यह फ़ील्ड आवश्यक है",
        invalidPhone: "अमान्य फोन नंबर",
        invalidEmail: "अमान्य ईमेल पता",
        passwordMismatch: "पासवर्ड मेल नहीं खाते",
        weakPassword: "पासवर्ड बहुत कमजोर है",
        serverError: "सर्वर त्रुटि हुई",
        networkError: "नेटवर्क त्रुटि हुई",
      },
    },
  },
  te: {
    translation: {
      // Common
      appName: "ఆరోగ్య సాథి",
      loading: "లోడ్ అవుతోంది...",
      error: "లోపం",
      success: "విజయవంతం",
      submit: "సమర్పించు",
      cancel: "రద్దు చేయి",
      back: "వెనుకకు",
      next: "తదుపరి",
      save: "సేవ్ చేయి",
      userType: {
        migrant: "వలసదారు",
        doctor: "డాక్టర్",
      },

      // Navigation
      home: "హోమ్",
      dashboard: "డాష్‌బోర్డ్",
      profile: "ప్రొఫైల్",
      logout: "లాగ్ అవుట్",

      // Auth - Common
      login: "లాగిన్",
      register: "నమోదు",
      phoneNumber: "ఫోన్ నంబర్",
      password: "పాస్‌వర్డ్",
      confirmPassword: "పాస్‌వర్డ్ నిర్ధారించండి",
      forgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా?",
      otpVerification: "OTP ధృవీకరణ",
      enterOTP: "మీ ఫోన్‌కు పంపిన OTPని నమోదు చేయండి",
      resendOTP: "OTP మళ్ళీ పంపు",
      verifyOTP: "OTP ధృవీకరించు",

      // Migrant Registration
      migrantRegister: {
        title: "వలస కార్మికుల నమోదు",
        name: "పూర్తి పేరు",
        age: "వయస్సు",
        gender: "లింగం",
        male: "పురుషుడు",
        female: "స్త్రీ",
        other: "ఇతర",
        state: "రాష్ట్రం",
        city: "నగరం",
        address: "చిరునామా",
        occupation: "వృత్తి",
        emergencyContact: "అత్యవసర సంప్రదింపు",
        registerSuccess: "నమోదు విజయవంతం!",
      },

      // Doctor Login/Dashboard
      doctor: {
        login: {
          title: "డాక్టర్ లాగిన్",
          email: "ఇమెయిల్",
          invalidCredentials: "చెల్లని ఇమెయిల్ లేదా పాస్‌వర్డ్",
        },
        dashboard: {
          title: "డాక్టర్ డాష్‌బోర్డ్",
          patients: "రోగులు",
          appointments: "అపాయింట్‌మెంట్లు",
          records: "ఆరోగ్య రికార్డులు",
          analytics: "విశ్లేషణలు",
          newPatients: "కొత్త రోగులు",
          totalPatients: "మొత్తం రోగులు",
          recentRecords: "ఇటీవలి రికార్డులు",
        },
        analytics: {
          title: "విశ్లేషణలు",
          patientStatistics: "రోగుల గణాంకాలు",
          diseaseDistribution: "వ్యాధుల పంపిణీ",
          ageGroups: "వయస్సు గుంపులు",
          monthlyTrends: "నెలవారీ ధోరణులు",
        },
      },

      // Migrant Dashboard
      migrant: {
        dashboard: {
          title: "నా ఆరోగ్య పోర్టల్",
          myRecords: "నా ఆరోగ్య రికార్డులు",
          upcomingAppointments: "రాబోయే అపాయింట్‌మెంట్లు",
          medications: "ప్రస్తుత మందులు",
          recentVisits: "ఇటీవలి ఆస్పత్రి సందర్శనలు",
          healthStatus: "ఆరోగ్య స్థితి",
          documents: "వైద్య పత్రాలు",
        },
        records: {
          addRecord: "ఆరోగ్య రికార్డు జోడించు",
          viewRecord: "రికార్డు చూడు",
          deleteRecord: "రికార్డు తొలగించు",
          recordType: "రికార్డు రకం",
          diagnosis: "రోగ నిర్ధారణ",
          prescription: "మందుల జాబితా",
          date: "తేదీ",
          doctor: "డాక్టర్",
          hospital: "ఆస్పత్రి",
        },
      },

      // Health Records
      healthRecord: {
        title: "ఆరోగ్య రికార్డు",
        type: "రకం",
        description: "వివరణ",
        symptoms: "లక్షణాలు",
        diagnosis: "రోగ నిర్ధారణ",
        treatment: "చికిత్స",
        medications: "మందులు",
        nextVisit: "తదుపరి సందర్శన తేదీ",
        attachments: "జతపరచిన పత్రాలు",
      },

      // Errors
      errors: {
        required: "ఈ ఫీల్డ్ అవసరం",
        invalidPhone: "చెల్లని ఫోన్ నంబర్",
        invalidEmail: "చెల్లని ఇమెయిల్",
        passwordMismatch: "పాస్‌వర్డ్‌లు సరిపోలలేదు",
        weakPassword: "పాస్‌వర్డ్ చాలా బలహీనంగా ఉంది",
        serverError: "సర్వర్ లోపం సంభవించింది",
        networkError: "నెట్‌వర్క్ లోపం సంభవించింది",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
      htmlTag: document.documentElement,
    },
    react: {
      useSuspense: false, // Prevents issues with SSR or older React versions
    },
  });

export default i18n;
