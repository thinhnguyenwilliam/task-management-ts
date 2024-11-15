// routes/taskRouter.ts
import { Router } from "express";
import { TaskController } from "../../controllers/client/taskController";

const tasksRoutes = Router();


// Get all tasks
tasksRoutes.get("/", TaskController.getAllTasks);

tasksRoutes.post("/", async (req, res) => {
    try {
        await TaskController.createTask(req, res);
    } catch (error) {
        console.error("Error in task creation route:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Get task details by ID
tasksRoutes.get("/:id", TaskController.getTaskById);


// routes/taskRoutes.ts
tasksRoutes.patch("/status", async (req, res) => {
    await TaskController.updateTasksStatus(req, res);
});


// Update a task by ID
tasksRoutes.patch("/edit/:id", async (req, res) => {
    try {
        await TaskController.updateTask(req, res);
    } catch (error) {
        console.error("Error in task update route:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Soft delete multiple tasks
tasksRoutes.patch("/soft-delete", async (req, res) => {
    try {
        await TaskController.softDeleteTasks(req, res);
    } catch (error) {
        console.error("Error in soft delete route:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default tasksRoutes;
