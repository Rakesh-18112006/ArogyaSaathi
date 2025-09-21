import { Request, Response } from "express";
import Migrant from "../models/Migrant";
import { generateQR } from "../utils/qr";
import { v4 as uuidv4 } from "uuid";
import { generateOtp, sendOtpSms } from "../utils/otp";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config";

/**
 * Step 1: Migrant starts registration → system sends OTP
 */
export async function registerMigrant(req: Request, res: Response) {
  try {
    const { name, phone, dob, gender, language, password } = req.body;
    if (!name || !phone || !password) {
      return res
        .status(400)
        .json({ message: "name, phone & password required" });
    }

    // check if already registered
    const existing = await Migrant.findOne({ phone });
    if (existing && existing.isVerified) {
      return res.status(400).json({ message: "phone already registered" });
    }

    const uniqueId = `MIG-${uuidv4()}`;
    const qrPayload = JSON.stringify({ uniqueId, name });
    const qrData = await generateQR(qrPayload);

    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    const passwordHash = await bcrypt.hash(password, 10);

    const migrant = existing
      ? Object.assign(existing, {
          name,
          dob,
          gender,
          language,
          passwordHash,
          uniqueId,
          qrData,
          otp,
          otpExpiresAt,
          isVerified: false,
        })
      : new Migrant({
          name,
          phone,
          dob,
          gender,
          language,
          uniqueId,
          qrData,
          otp,
          otpExpiresAt,
          passwordHash,
          isVerified: false,
        });

    await migrant.save();
    await sendOtpSms(phone, otp);

    return res.json({
      message: "OTP sent to phone. Please verify.",
      migrantId: migrant._id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "server error" });
  }
}

/**
 * Step 2: Verify OTP
 */
export async function verifyMigrantOtp(req: Request, res: Response) {
  try {
    const { migrantId, otp } = req.body;
    if (!migrantId || !otp)
      return res.status(400).json({ message: "migrantId & otp required" });

    const migrant = await Migrant.findById(migrantId);
    if (!migrant) return res.status(404).json({ message: "migrant not found" });

    if (!migrant.otp || migrant.otp !== otp) {
      return res.status(400).json({ message: "invalid OTP" });
    }
    if (migrant.otpExpiresAt && migrant.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    migrant.isVerified = true;
    migrant.otp = undefined;
    migrant.otpExpiresAt = undefined;
    await migrant.save();

    return res.json({ message: "Phone verified. Registration complete." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "server error" });
  }
}

/**
 * Migrant login
 */
export async function loginMigrant(req: Request, res: Response) {
  try {
    const { phone, password } = req.body;
    if (!phone || !password)
      return res.status(400).json({ message: "phone & password required" });

    const migrant = await Migrant.findOne({ phone });
    if (!migrant || !migrant.isVerified) {
      return res
        .status(400)
        .json({ message: "not registered or not verified" });
    }

    const match = await bcrypt.compare(password, migrant.passwordHash || "");
    if (!match) return res.status(401).json({ message: "invalid credentials" });

    const token = jwt.sign(
      {
        id: migrant._id,
        role: "migrant",
        name: migrant.name,
        uniqueId: migrant.uniqueId,
      },
      config.jwtSecret,
      { expiresIn: "7d" }
    );

    return res.json({ token, migrant });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "server error" });
  }
}

/**
 * Get migrant profile (after login)
 */
export async function getMigrantProfile(req: any, res: Response) {
  try {
    const migrant = await Migrant.findById(req.user.id).select(
      "-passwordHash -otp -otpExpiresAt"
    );
    if (!migrant) return res.status(404).json({ message: "not found" });
    return res.json({ migrant });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "server error" });
  }
}
