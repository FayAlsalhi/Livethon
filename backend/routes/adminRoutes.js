import express from "express";
import Individual from "../models/Individual.js";
import Team from "../models/Team.js";

const router = express.Router();

// ===== INDIVIDUAL REGISTRATIONS =====

// GET /api/admin/registrations  -> JSON 
// GET /api/admin/registrations.csv -> CSV download 
router.get("/registrations", async (_req, res) => {
  try {
    const participants = await Individual.find().sort({ createdAt: -1 });
    res.json(participants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/registrations.csv", async (_req, res) => {
  try {
    const rows = await Individual.find().sort({ createdAt: -1 }).lean();

   
    const header = [
      "name",
      "gender",
      "email",
      "phone",
      "studyWork",
      "specialization",
      "age",
      "skills",
      "createdAt"
    ];

    
    const esc = (v) =>
      `"${String(v ?? "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;

    const lines = [
      header.join(","), 
      ...rows.map((r) =>
        [
          r.name,
          r.email,
          r.gender,
          r.phone,
          r.studyWork,
          r.specialization,
          r.age,
          r.skills,
          r.createdAt ? new Date(r.createdAt).toISOString() : ""
        ]
          .map(esc)
          .join(",")
      )
    ];

    const csv = lines.join("\n");

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="lifethon_individual_registrations.csv"`
    );
    return res.status(200).send(csv);
  } catch (err) {
    console.error("CSV export error:", err);
    return res
      .status(500)
      .json({ success: false, message: "CSV export failed", error: err.message });
  }
});

// ===== TEAM REGISTRATIONS =====

// GET /api/admin/teams -> JSON
router.get("/teams", async (req, res) => {
  try {
    const { status, teamName, leaderEmail, page = 1, limit = 50 } = req.query;
    
    // Build filter query
    const filter = {};
    if (status) filter.status = status;
    if (teamName) filter.teamName = { $regex: teamName, $options: 'i' };
    if (leaderEmail) filter["teamLeader.email"] = { $regex: leaderEmail, $options: 'i' };
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const teams = await Team.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();
    
    const total = await Team.countDocuments(filter);
    
    res.json({
      success: true,
      data: teams,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    console.error("Get teams error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/admin/teams.csv -> CSV download
router.get("/teams.csv", async (_req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 }).lean();

    const header = [
      "teamName",
      "projectIdea",
      "teamNumber",
      "status",
      "leaderName",
      "leaderEmail",
      "leaderPhone",
      "leaderOrganization",
      "leaderSpecialization",
      "leaderGender",
      "leaderAge",
      "leaderSkills",
      "memberNames",
      "memberEmails",
      "registrationDate"
    ];

    const esc = (v) =>
      `"${String(v ?? "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;

    const lines = [
      header.join(","), 
      ...teams.map((team) => {
        const memberNames = team.members.map(m => m.name).join("; ");
        const memberEmails = team.members.map(m => m.email).join("; ");
        
        return [
          team.teamName,
          team.projectIdea,
          team.teamNumber,
          team.status,
          team.teamLeader.name,
          team.teamLeader.email,
          team.teamLeader.phone || "",
          team.teamLeader.organization,
          team.teamLeader.specialization,
          team.teamLeader.gender || "",
          team.teamLeader.age,
          team.teamLeader.skills,
          memberNames,
          memberEmails,
          team.createdAt ? new Date(team.createdAt).toISOString() : ""
        ]
          .map(esc)
          .join(",");
      })
    ];

    const csv = lines.join("\n");

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="lifethon_team_registrations.csv"`
    );
    return res.status(200).send(csv);
  } catch (err) {
    console.error("Teams CSV export error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Teams CSV export failed", error: err.message });
  }
});

// GET /api/admin/teams/:id -> Get specific team
router.get("/teams/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId format
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid team ID format"
      });
    }
    
    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ 
        success: false, 
        message: "Team not found" 
      });
    }
    res.json({ success: true, data: team });
  } catch (err) {
    console.error("Get team error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT /api/admin/teams/:id -> Update team status
router.put("/teams/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    // Validate ObjectId format
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid team ID format"
      });
    }
    
    if (!status || !["pending", "approved", "rejected", "cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    const team = await Team.findByIdAndUpdate(
      id,
      { 
        status, 
        notes: notes?.trim() || "",
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!team) {
      return res.status(404).json({ 
        success: false, 
        message: "Team not found" 
      });
    }

    res.json({ 
      success: true, 
      message: "Team status updated successfully",
      data: team 
    });
  } catch (err) {
    console.error("Update team error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/admin/stats -> Get registration statistics
router.get("/stats", async (_req, res) => {
  try {
    const [individualCount, teamCount, pendingTeams, approvedTeams] = await Promise.all([
      Individual.countDocuments(),
      Team.countDocuments(),
      Team.countDocuments({ status: "pending" }),
      Team.countDocuments({ status: "approved" })
    ]);

    const totalParticipants = individualCount + (teamCount * 4); // Approximate team size

    res.json({
      success: true,
      data: {
        individualRegistrations: individualCount,
        teamRegistrations: teamCount,
        pendingTeams,
        approvedTeams,
        totalParticipants,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;