import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import teamRoutes from "./routes/team.js";
import memberRoutes from "./routes/member.js";
import projectRoutes from "./routes/project.js";
import taskRoutes from "./routes/task.js";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
