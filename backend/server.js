import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/db.js";
import registerRoutes from "./routes/registerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
await connectDB();

const app = express();

// security & parsing
app.use(helmet());
app.use(express.json());

// CORS: allow your Next app during dev
app.use(cors({
  origin: (process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"]),
}));

// healthcheck
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/register", registerRoutes);
app.use("/api/admin", adminRoutes);
// TODO: later → app.use("/api/participants", participantRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🌐 API listening on :${PORT}`));