import express from "express";
import Individual from "../models/Individual.js";

const router = express.Router();

// GET /api/admin/registrations  -> JSON (existing)
// GET /api/admin/registrations.csv -> CSV download (new)
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

    // Header columns
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

    // CSV escape helper
    const esc = (v) =>
      `"${String(v ?? "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;

    const lines = [
      header.join(","), // header row
      ...rows.map((r) =>
        [
          r.name,
          r.gender,
          r.email,
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
      `attachment; filename="lifethon_registrations.csv"`
    );
    return res.status(200).send(csv);
  } catch (err) {
    console.error("CSV export error:", err);
    return res
      .status(500)
      .json({ success: false, message: "CSV export failed", error: err.message });
  }
});

export default router;