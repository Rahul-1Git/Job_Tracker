import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter.js";
import route from "./routes/jobsRouter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGOURL;

// MongoDB connection
if (!URL) {
  console.error("❌ MONGOURL is undefined. Check your .env file");
} else {
  mongoose
    .connect(URL)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
}

// Middleware

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/api", route);

// Routes
app.get("/hi", (req, res) => {
  res.send("Hello");
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
