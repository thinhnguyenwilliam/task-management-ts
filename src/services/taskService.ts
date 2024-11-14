import { Task } from "../models/taskModel";

export class TaskService {
    async getAllTasks(
        queryParams: any,
        sortParams?: { sortBy: string; sortOrder: "asc" | "desc" },
        page: number = 1,
        limit: number = 10
    ) {
        const query: any = { deleted: false };

        for (const key in queryParams) {
            if (queryParams[key] && key !== "deleted" && key !== "sortBy" && key !== "sortOrder" && key !== "page" && key !== "limit") {
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

}
