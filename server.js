import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import teamRoutes from "./routes/team.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/team", teamRoutes);


// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
