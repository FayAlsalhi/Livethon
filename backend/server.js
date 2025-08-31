import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import basicAuth from "express-basic-auth";
import connectDB from "./config/db.js";
import registerRoutes from "./routes/registerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { generalApiLimiter } from "./middleware/rateLimit.js";

dotenv.config();

const requiredEnvVars = ['MONGO_URI'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

await connectDB();

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
      scriptSrcAttr: ["'unsafe-inline'"],
    },
  },
}));
app.use(express.json({ limit: '1mb' })); 
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// CORS configuration
app.use(cors({
  origin: (process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"]),
}));

// General rate limiting for all routes
app.use(generalApiLimiter);

// Health check endpoint
app.get("/health", async (_req, res) => {
  try {
    // Check database connection
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    res.json({ 
      ok: true, 
      timestamp: new Date().toISOString(),
      database: dbStatus,
      uptime: process.uptime(),
      memory: process.memoryUsage()
    });
  } catch (error) {
    res.status(500).json({ 
      ok: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Basic Auth middleware for admin routes
const adminAuth = basicAuth({
  users: { [process.env.ADMIN_USERNAME]: process.env.ADMIN_PASSWORD },
  challenge: true,
  realm: 'Livethon Admin Panel'
});

// API routes
app.use("/api/register", registerRoutes);
app.use("/api/admin", adminAuth, adminRoutes);

// Admin panel route (protected by Basic Auth)
// 
// This endpoint should serve the admin panel
// 
//  REQUIRED FEATURES:
// - Search and filter teams by: teamName, leaderEmail, organization, specialization, status
// - Display team statistics (total, pending, approved)
// - List all teams in a table with: teamName, projectIdea, teamLeader, teamNumber, status, registrationDate, statusChange
// - Export all teams to CSV with current filters
// - Export only approved teams to CSV
// - Change team status (pending/approved/rejected/cancelled)
// - Organization and specialization dropdowns populated from API
//
//  AVAILABLE API ENDPOINTS:
// - GET /api/admin/stats - Get team statistics
// - GET /api/admin/teams - Search/filter teams
// - GET /api/admin/filter-options - Get organizations and specializations
// - GET /api/admin/teams.csv - Export all teams to CSV
// - GET /api/admin/teams/approved.csv - Export approved teams to CSV
// - POST /api/admin/teams/:id/status - Change team status
//

app.get("/admin", adminAuth, (req, res) => {
  res.json({
    features: [
      "Search and filter teams by: teamName, leaderEmail, organization, specialization, status",
      "Display team statistics (total, pending, approved)",
      "List all teams in a table with: teamName, projectIdea, teamLeader, teamNumber, status, registrationDate, statusChange",
      "Export all teams to CSV with current filters",
      "Export only approved teams to CSV",
      "Change team status (pending/approved/rejected/cancelled)",
      "Organization and specialization dropdowns populated from API"
    ],
    apiEndpoints: [
      "GET /api/admin/stats - Get team statistics",
      "GET /api/admin/teams - Search/filter teams",
      "GET /api/admin/filter-options - Get organizations and specializations",
      "GET /api/admin/teams.csv - Export all teams to CSV",
      "GET /api/admin/teams/approved.csv - Export approved teams to CSV",
      "POST /api/admin/teams/:id/status - Change team status"
    ],
    documentation: "See backend/ADMIN_API_DOCUMENTATION.md for complete implementation guide"
  });
});

const PORT = process.env.PORT || 5050;
const server = app.listen(PORT, () => console.log(`🌐 API listening on :${PORT}`));

const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
  
  server.close(async () => {
    console.log('✅ HTTP server closed');
    try {
      await mongoose.connection.close();
      console.log('✅ MongoDB connection closed');
      process.exit(0);
    } catch (error) {
      console.error('❌ Error closing MongoDB connection:', error);
      process.exit(1);
    }
  });
  
  setTimeout(() => {
    console.error('❌ Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));