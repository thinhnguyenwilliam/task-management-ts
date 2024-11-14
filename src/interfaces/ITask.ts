import { Document } from "mongoose";
import { TaskStatus } from "../enums/taskStatus";

export interface ITask extends Document {
    title: string;
    status: TaskStatus;
    content: string;
    timeStart: Date;
    timeFinish: Date;
    listUser: string[]; // You can use ObjectId if this should reference a User model
    deleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
