import express from "express";
import { createTask, deleteTask, getTasks } from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", getTasks);
router.delete("/", deleteTask)

export default router;
