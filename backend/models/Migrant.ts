import mongoose, { Schema, Document } from "mongoose";

export interface IMigrant extends Document {
  name: string;
  phone: string;
  dob?: Date;
  gender?: string;
  language?: string;
  uniqueId: string;
  qrData?: string;
  lastSyncedAt?: Date;
  version?: number;
  passwordHash?: string;
  isVerified: boolean;
  otp?: string;
  otpExpiresAt?: Date;
  createdAt: Date;
}

const MigrantSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    dob: Date,
    gender: String,
    language: { type: String, default: "ml" },
    uniqueId: { type: String, required: true, unique: true },
    qrData: String,
    lastSyncedAt: Date,
    version: { type: Number, default: 1 },
    passwordHash: String,
    isVerified: { type: Boolean, default: false },
    otp: String,
    otpExpiresAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model<IMigrant>("Migrant", MigrantSchema);
