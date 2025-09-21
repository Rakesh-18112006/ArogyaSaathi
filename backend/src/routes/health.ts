import { Router } from "express";
import {
  createHealthRecord,
  getHealthRecords,
  aiSummary,
} from "../controllers/healthController";
import { authMiddleware } from "../middlewares/auth";
const router = Router();

router.post("/", authMiddleware, createHealthRecord);
router.get("/:migrantId", authMiddleware, getHealthRecords);
router.get("/:migrantId/summary", authMiddleware, aiSummary);

export default router;
