import { Router } from "express";
import {
  registerMigrant,
  verifyMigrantOtp,
  loginMigrant,
  getMigrantProfile,
} from "../controllers/migrantController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

// Migrant self-register (starts OTP flow)
router.post("/register", registerMigrant);

// Verify OTP to complete registration
router.post("/verify-otp", verifyMigrantOtp);

// Migrant login
router.post("/login", loginMigrant);

// Migrant profile (requires token after login)
router.get("/me", authMiddleware, getMigrantProfile);

export default router;
