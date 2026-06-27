const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

// Helper: look up university_id from api_key
async function getUniversityId(api_key) {
  if (!api_key) return null;

  const { data, error } = await supabase
    .from("universities")
    .select("id")
    .eq("api_key", api_key)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;

  return data.id;
}

// GET /api/programs
router.get("/", async (req, res) => {
  const university_id = "0bce6d3a-d356-432f-9968-c2b7489b3337";
  console.log("University ID:", university_id);

  const { data, error } = await supabase
    .from("programs")
    .select("*");

  console.log("Error:", error);
  console.log("Programs returned:", data);
  console.log("Count:", data?.length);  

  if (error) {
    return res.status(500).json({
      error: error.message
    });
  }

  res.json({
    success: true,
    data
  });
});

module.exports = router;