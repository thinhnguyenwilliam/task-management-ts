import { Task } from "../models/taskModel";
import { TaskStatus } from "../enums/taskStatus";


export class TaskService {
    async getAllTasks(
        queryParams: any,
        sortParams?: { sortBy: string; sortOrder: "asc" | "desc" },
        page: number = 1,
        limit: number = 10
    ) {
        const query: any = { deleted: false };

        // Check for keyWord parameter and apply regex search
        if (queryParams.keyWord) {
            const regex = new RegExp(queryParams.keyWord, "i"); // "i" flag makes it case-insensitive
            query.$or = [{ title: regex }, { content: regex }]; // Search in `title` or `content`(thêm object content chỉ cho biết thôi)
        }


        for (const key in queryParams) {
            if (queryParams[key] && !["deleted", "sortBy", "sortOrder", "page", "limit", "keyWord"].includes(key)) {
                if (key === "timeStart" || key === "timeFinish") {
                    query[key] = new Date(queryParams[key]);
                } else {
                    query[key] = queryParams[key];
                }
            }
        }

        // Default sort configuration: sort by `createdAt` in descending order
        const sortBy = sortParams?.sortBy || "createdAt";
        const sortOrder = sortParams?.sortOrder === "asc" ? 1 : -1;

        // Calculate skip based on page and limit
        const skip = (page - 1) * limit;

        // Fetch tasks with pagination and sorting
        const tasks = await Task.find(query)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit);

        // Count total documents that match the query
        const totalTasks = await Task.countDocuments(query);

        // Return tasks and metadata
        return {
            tasks,
            totalTasks,
            currentPage: page,
            totalPages: Math.ceil(totalTasks / limit),
        };
    }



    async getTaskById(id: string) {
        return await Task.
            findOne({ _id: id, deleted: false });
    }


    async updateTasksStatus(taskIds: string[], newStatus: string) {
        try {
            // Validate the new status using the TaskStatus enum
            if (!Object.values(TaskStatus).includes(newStatus as TaskStatus)) {
                throw new Error("Invalid status");
            }

            // Update the status of tasks matching the provided IDs
            const result = await Task.updateMany(
                { _id: { $in: taskIds }, deleted: false }, // Filter for specific tasks and exclude deleted ones
                { $set: { status: newStatus } }
            );

            return { modifiedCount: result.modifiedCount };
        } catch (error) {
            console.error("Error updating task status:", error);
            throw error;
        }
    }


    async createTask(newTaskData: {
        title: string;
        content: string;
        status: TaskStatus;
        timeStart: Date;
        timeFinish: Date;
        createdAt: Date;
        updatedAt: Date;
        listUser: string[];
    }) {
        try {
            // Create a new Task instance with the provided data
            const task = new Task({
                ...newTaskData,
                status: newTaskData.status || TaskStatus.INITIAL, // Set default status to 'INITIAL' if not provided
                deleted: false, // Default to not deleted
            });

            // Save the task to the database
            await task.save();

            return task;
        } catch (error) {
            console.error("Error creating task:", error);
            throw error;
        }
    }


    async updateTask(taskId: string, updateData: {
        title?: string;
        content?: string;
        status?: TaskStatus;
        timeStart?: Date;
        timeFinish?: Date;
        createdAt?: Date;
        updatedAt?: Date;
        listUser?: string[];
    }) {
        try {
            // Validate status if it's being updated
            if (updateData.status && !Object.values(TaskStatus).includes(updateData.status)) {
                throw new Error("Invalid status");
            }

            // Update the task and return the updated document
            const updatedTask = await Task.findByIdAndUpdate(
                taskId,
                { $set: updateData },
                { new: true } // Return the updated task
            );

            return updatedTask;
        } catch (error) {
            console.error("Error updating task:", error);
            throw error;
        }
    }

    async softDeleteTasks(taskIds: string[]) {
        try {
            // Perform a bulk update to mark tasks as deleted
            const result = await Task.updateMany(
                { _id: { $in: taskIds }, deleted: false }, // Only update tasks not already deleted
                { $set: { deleted: true, deletedAt: new Date() } }
            );

            return { modifiedCount: result.modifiedCount };
        } catch (error) {
            console.error("Error soft deleting tasks:", error);
            throw error;
        }
    }
}
