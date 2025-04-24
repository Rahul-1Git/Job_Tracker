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

if (!URL) {
  console.error("❌ MONGOURL is undefined. Check your .env file");
  process.exit(1); // exit if no DB URL
}

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRouter);
app.use("/api", route);

app.get("/hi", (req, res) => {
  res.send("Hello");
});

app.use((req, res) => {
  res.status(404).send("Route not found");
});

// ✅ Only start server after DB connects
mongoose
  .connect(URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // optional: stop the server from running if DB fails
  });
