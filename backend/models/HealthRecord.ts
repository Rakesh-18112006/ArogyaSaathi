import mongoose, { Schema, Document } from "mongoose";

export interface IHealthRecord extends Document {
  migrantId: string;
  title: string;
  content: string; // full text of note / test results / prescription JSON
  createdBy: string; // user id (doctor)
  createdAt: Date;
  version?: number;
}

const HealthRecordSchema: Schema = new Schema(
  {
    migrantId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: String },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model<IHealthRecord>(
  "HealthRecord",
  HealthRecordSchema
);
