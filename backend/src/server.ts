import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import migrantRoutes from "./routes/migrant";
import healthRoutes from "./routes/health";
import accessRoutes from "./routes/access";
import jwt from "jsonwebtoken";
import User from "./models/User";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));

// connect db
mongoose
  .connect(config.mongoUri)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error("Mongo connect err", err));

// public health check
app.get("/", (req, res) => res.json({ ok: true }));

// simple auth endpoints for hackathon (email/password or create test users)
app.post("/api/auth/register", async (req, res) => {
  const { name, email, phone, role, password } = req.body;
  if (!name || !role) return res.status(400).json({ message: "missing" });
  const u = new User({ name, email, phone, role });
  if (password) {
    const hash = await bcrypt.hash(password, 10);
    u.passwordHash = hash;
  }
  await u.save();
  const token = jwt.sign(
    { id: u._id, role: u.role, name: u.name },
    config.jwtSecret,
    { expiresIn: "7d" }
  );
  res.json({ user: u, token });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password, phone } = req.body;
  let u;
  if (email) u = await User.findOne({ email });
  if (!u && phone) u = await User.findOne({ phone });
  if (!u) return res.status(404).json({ message: "user not found" });
  if (password && u.passwordHash) {
    const ok = await bcrypt.compare(password, u.passwordHash);
    if (!ok) return res.status(401).json({ message: "invalid credentials" });
  }
  const token = jwt.sign(
    { id: u._id, role: u.role, name: u.name },
    config.jwtSecret,
    { expiresIn: "7d" }
  );
  res.json({ token, user: u });
});

// mount routes
app.use("/api/migrants", migrantRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/access", accessRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
