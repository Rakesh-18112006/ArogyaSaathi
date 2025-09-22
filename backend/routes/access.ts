import { Router } from "express";
import {
  requestAccess,
  verifyOtp,
  getRecordsIfAccessGranted,
} from "../controllers/accessController";
import { authMiddleware } from "../middlewares/auth";
const router = Router();

router.post("/request", authMiddleware, requestAccess);
router.post("/verify", authMiddleware, verifyOtp);
router.get("/records/:migrantId", authMiddleware, getRecordsIfAccessGranted);

export default router;
