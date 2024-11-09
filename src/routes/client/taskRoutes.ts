// routes/taskRouter.ts
import { Router } from "express";
import { TaskController } from "../../controllers/client/taskController";

const tasksRoutes = Router();


// Get all tasks
tasksRoutes.get("/", TaskController.getAllTasks);

// Get task details by ID
tasksRoutes.get("/:id", TaskController.getTaskById);

export default tasksRoutes;
