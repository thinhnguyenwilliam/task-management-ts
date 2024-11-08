import { Task } from "../models/taskModel";

export class TaskService 
{
    async getAllTasks() {
        return await Task.find({ deleted: false });
    }

    async getTaskById(id: string) 
    {
        return await Task.findOne({ _id: id, deleted: false });
    }
}
