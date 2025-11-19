import express from "express";
import { getFullDashboardSummary } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", getFullDashboardSummary);

export default router;
