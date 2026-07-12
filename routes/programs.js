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
  const api_key = req.headers["x-api-key"];

  const university_id =
    await getUniversityId(api_key);

  if (!university_id) {
    return res.status(401).json({
      error: "Invalid university API key."
    });
  }
  console.log("University ID:", university_id);

  const response = await supabase
    .from("programs")
    .select("*")
    .eq("university_id", university_id)
    .order("program_name");

  console.log("Full response:", response);

  const { data, error } = response;

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