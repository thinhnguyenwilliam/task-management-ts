import { Task } from "../models/taskModel";

export class TaskService {
    async getAllTasks(queryParams: any, sortParams?: { sortBy: string; sortOrder: "asc" | "desc" }) {
        const query: any = { deleted: false };

        for (const key in queryParams) {
            if (queryParams[key] && key !== "deleted" && key !== "sortBy" && key !== "sortOrder") {
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

        //console.log('Executing query:', query); // Log the query to see if it's correct
        //console.log('Sort parameters:', sortBy, sortOrder); // Log sort params

        return await Task.find(query).sort({ [sortBy]: sortOrder });
    }



    async getTaskById(id: string) {
        return await Task.
            findOne({ _id: id, deleted: false });
    }

}
