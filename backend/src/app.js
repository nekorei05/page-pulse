const express = require("express");
const cors = require("cors");

const auditRoutes = require("./routes/audit.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Page Pulse API is running"
  });
});

app.use("/api/audit", auditRoutes);

module.exports = app;