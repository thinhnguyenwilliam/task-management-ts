import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { MyJwtPayload } from "../interfaces/IMyJwtPayload";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRATION = process.env.JWT_EXPIRES_IN;

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};



export const verifyToken = (token: string): MyJwtPayload | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return typeof decoded === 'object' ? (decoded as MyJwtPayload) : null;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};