import mongoose, { Schema, Document } from "mongoose";

export interface IAccessRequest extends Document {
  migrantId: string;
  requesterId: string; // doctor id
  otp?: string;
  otpExpiresAt?: Date;
  status: "pending" | "granted" | "denied" | "expired";
  createdAt: Date;
  verifiedAt?: Date;
}

const AccessRequestSchema: Schema = new Schema(
  {
    migrantId: { type: String, required: true, index: true },
    requesterId: { type: String, required: true },
    otp: String,
    otpExpiresAt: Date,
    status: {
      type: String,
      enum: ["pending", "granted", "denied", "expired"],
      default: "pending",
    },
    verifiedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model<IAccessRequest>(
  "AccessRequest",
  AccessRequestSchema
);
