import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/migrantdb",
  jwtSecret: process.env.JWT_SECRET || "change_this_secret",
  twilio: {
    accountSid: process.env.TWILIO_SID || "",
    authToken: process.env.TWILIO_TOKEN || "",
    phoneFrom: process.env.TWILIO_FROM || "",
  },
  ai: {
    provider: process.env.AI_PROVIDER || "openai", // or 'hf'
    openaiKey: process.env.OPENAI_KEY || "",
    hfKey: process.env.HF_KEY || "",
  },
};
