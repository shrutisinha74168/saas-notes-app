const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Health endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// TODO: Routes add karenge yaha
 app.use("/api/auth", require("./routes/authRoutes"));
 app.use("/api/notes", require("./routes/noteRoutes"));
 app.use("/api/tenants", require("./routes/tenantRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(` Server running on http://localhost:${PORT}`)
);
