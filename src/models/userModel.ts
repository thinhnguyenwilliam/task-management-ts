import { IUser } from "../interfaces/IUser";
import mongoose, { Schema } from "mongoose";


const userSchema: Schema<IUser> = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        token: { type: String },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

// Create and export the model
export const User = mongoose.model<IUser>("User", userSchema, "users");