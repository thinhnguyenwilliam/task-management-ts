// routes/taskRouter.ts
import { Router } from "express";
import { TaskController } from "../controllers/taskController";

const router = Router();

// Get all tasks
router.get("/tasks", TaskController.getAllTasks);

// Get task details by ID
router.get("/tasks/detail/:id", TaskController.getTaskById);

export default router;
