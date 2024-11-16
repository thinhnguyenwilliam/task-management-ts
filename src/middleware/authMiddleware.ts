import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

    if (!token) {
        res.status(403).json({ message: "No token provided" });
        return; // Explicitly return to ensure no further processing
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as any).user = decoded; // Attach user data to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};