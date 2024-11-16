import { Document } from "mongoose";

// Define the TypeScript interface for the User model
export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    token?: string; // Optional field
    deleted: boolean;
    deletedAt?: Date; // Optional field
    createdAt: Date; // Provided by timestamps
    updatedAt: Date; // Provided by timestamps
}