import { Request, Response } from 'express';
import { registerUser, loginUser } from '../../services/userService';

export const register = async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;
    try {
        const user = await registerUser(fullName, email, password);
        if (user) {
            res.status(201).json({ message: 'User registered successfully', user });
        } else {
            res.status(400).json({ message: 'Registration failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const token = await loginUser(email, password);
        if (token) {
            res.status(200).json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

