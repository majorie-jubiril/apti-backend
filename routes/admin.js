const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

// POST /api/admin/login - Verify super admin password
router.post("/login", (req, res) => {
  const { password } = req.body;

  if (password !== process.env.SUPER_ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid password" });
  }

  res.json({ success: true });
});

// GET /api/admin/universities - Get all universities with assessment counts
router.get("/universities", async (req, res) => {
  const { password } = req.query;

  if (password !== process.env.SUPER_ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { data: universities, error } = await supabase
    .from("universities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // For each university, count their assessments
  const withCounts = await Promise.all(
    universities.map(async (uni) => {
      const { count } = await supabase
        .from("assessment_results")
        .select("*", { count: "exact", head: true })
        .eq("university_id", uni.id);

      return { ...uni, assessment_count: count || 0 };
    })
  );

  res.json({ success: true, data: withCounts });
});

module.exports = router;