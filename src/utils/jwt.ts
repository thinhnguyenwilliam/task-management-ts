import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (taskId: string): string => {
    return jwt.sign({ taskId }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};
