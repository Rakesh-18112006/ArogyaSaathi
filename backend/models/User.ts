import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email?: string;
  phone?: string;
  role: "doctor" | "worker" | "admin" | "employer";
  passwordHash?: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: String,
    phone: String,
    role: {
      type: String,
      enum: ["doctor", "worker", "admin", "employer"],
      required: true,
    },
    passwordHash: String,
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
