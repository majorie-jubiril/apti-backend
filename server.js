const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const resultsRouter = require("./routes/results");
app.use("/api/results", resultsRouter);

const adminRouter = require("./routes/admin");
const programsRouter = require("./routes/programs");
app.use("/api/admin", adminRouter);
app.use("/api/programs", programsRouter);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "AptiGuide backend is running 🎉" });
});

console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_KEY exists:", !!process.env.SUPABASE_KEY);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});