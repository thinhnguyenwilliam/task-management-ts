// controllers/taskController.ts
import { Request, Response } from "express";
import { TaskService } from "../services/taskService";

const taskService = new TaskService();

export class TaskController {
    static async getAllTasks(req: Request, res: Response) {
        try {
            const tasks = await taskService.getAllTasks();
            res.status(200).json(tasks); // HTTP 200 OK
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch tasks" });
        }
    }

    static async getTaskById(req: Request, res: Response) {
        const id: string = req.params.id;
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
