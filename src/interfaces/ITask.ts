import { Document } from "mongoose";
import { TaskStatus } from "../enums/taskStatus";

export interface ITask extends Document {
    title: string;
    taskParentId: string;
    status: TaskStatus;
    content: string;
    timeStart: Date;
    timeFinish: Date;
    createdBy: string;
    listUser: string[]; // You can use ObjectId if this should reference a User model
    deleted: boolean;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
