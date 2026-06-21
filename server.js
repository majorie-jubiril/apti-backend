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
app.use("/api/admin", adminRouter);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "AptiGuide backend is running 🎉" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});