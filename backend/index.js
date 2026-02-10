const express = require("express");
const cors = require("cors");

const topicRoutes = require("./routes/topics");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/topics", topicRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
