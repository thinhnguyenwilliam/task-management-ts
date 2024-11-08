import mongoose from "mongoose";
import { TaskStatus } from "../enums/taskStatus";
import { ITask } from "../interfaces/ITask";

// Define the schema for Task
const taskSchema = new mongoose.Schema<ITask>(
    {
        title: {
            type: String,
            required: true,
        },
        taskParentId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(TaskStatus), // Apply TaskStatus enum to status field
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        timeStart: {
            type: Date,
            required: true,
        },
        timeFinish: {
            type: Date,
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
        },
        listUser: {
            type: [String],
            required: true,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

// Create and export the Task model
export const Task = mongoose.model<ITask>("Task", taskSchema, "tasks");
