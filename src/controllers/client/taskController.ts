// controllers/taskController.ts
import { Request, Response } from "express";
import { TaskService } from "../../services/taskService";
import { TaskStatus } from "../../enums/taskStatus";


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

    static async updateTasksStatus(req: Request, res: Response) {
        try {
            const { taskIds, newStatus } = req.body;

            if (!Array.isArray(taskIds) || taskIds.length === 0) {
                return res.status(400).json({ message: "taskIds must be a non-empty array" });
            }
            if (!newStatus) {
                return res.status(400).json({ message: "newStatus is required" });
            }

            // Call the service method to update statuses
            const result = await taskService.updateTasksStatus(taskIds, newStatus);

            res.status(200).json({ message: "Tasks updated successfully", modifiedCount: result.modifiedCount });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to update task status", error: error });
        }
    }


    static async createTask(req: Request, res: Response) {
        try {
            const { title, content, status, timeStart, timeFinish, createdAt, updatedAt, listUser } = req.body;

            if (!title || !content || !status || !timeStart || !timeFinish || !createdAt || !updatedAt || !listUser) {
                return res.status(400).json({ message: "All fields are required." });
            }

            // Ensure status is valid
            if (!Object.values(TaskStatus).includes(status)) {
                return res.status(400).json({ message: "Invalid task status." });
            }

            // Call the service to create the task
            const newTask = await taskService.createTask({
                title,
                content,
                status,
                timeStart,
                timeFinish,
                createdAt,
                updatedAt,
                listUser,
            });

            res.status(201).json(newTask); // HTTP 201 Created
        } catch (error) {
            console.error("Error creating task:", error);
            res.status(500).json({ message: "Failed to create task" });
        }
    }

    static async updateTask(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title, content, status, timeStart, timeFinish, createdAt, updatedAt, listUser } = req.body;

            const updatedTask = await taskService.updateTask(id, {
                title,
                content,
                status,
                timeStart,
                timeFinish,
                createdAt,
                updatedAt,
                listUser,
            });

            if (updatedTask) {
                res.status(200).json(updatedTask); // HTTP 200 OK
            } else {
                res.status(404).json({ message: "Task not found" }); // HTTP 404 Not Found
            }
        } catch (error) {
            console.error("Error updating task:", error);
            res.status(500).json({ message: "Failed to update task" });
        }
    }

    static async softDeleteTasks(req: Request, res: Response) {
        try {
            const { taskIds } = req.body;

            if (!Array.isArray(taskIds) || taskIds.length === 0) {
                return res.status(400).json({ message: "taskIds must be a non-empty array" });
            }

            const result = await taskService.softDeleteTasks(taskIds);

            res.status(200).json({ message: "Tasks soft deleted successfully", modifiedCount: result.modifiedCount });
        } catch (error) {
            console.error("Error soft deleting tasks:", error);
            res.status(500).json({ message: "Failed to soft delete tasks" });
        }
    }
}
