const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

// POST /api/results - Save an assessment result
router.post("/", async (req, res) => {
  const { personality_type, scores, fits, top_program } = req.body;

  if (!personality_type || !scores || !fits || !top_program) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { data, error } = await supabase
    .from("assessment_results")
    .insert([{ personality_type, scores, fits, top_program }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ success: true, data });
});

// GET /api/results - Get all results
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("assessment_results")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true, data });
});

// PATCH /api/results/:id - Update applied program
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { applied_program } = req.body;

  if (!applied_program) {
    return res.status(400).json({ error: "Missing applied_program" });
  }

  const { data, error } = await supabase
    .from("assessment_results")
    .update({ applied_program })
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true, data });
});

module.exports = router;