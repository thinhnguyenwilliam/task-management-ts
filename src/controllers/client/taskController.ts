// controllers/taskController.ts
import { Request, Response } from "express";
import { TaskService } from "../../services/taskService";

const taskService = new TaskService();

export class TaskController {
    static async getAllTasks(req: Request, res: Response) {
        try {
            const sortBy = req.query.sortBy as string;
            const sortOrder = req.query.sortOrder as "asc" | "desc";
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            
            const tasks = await taskService.getAllTasks(req.query, { sortBy, sortOrder }, page, limit);
            
            res.status(200).json(tasks); // HTTP 200 OK
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch tasks" });
        }
    }

    static async getTaskById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const task = await taskService.getTaskById(id);
            if (task) {
                res.status(200).json(task); // HTTP 200 OK
            } else {
                res.status(404).json({ message: "Task not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch task details" });
        }
    }
}
