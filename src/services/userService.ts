import { User } from "../models/userModel";
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';
import { IUser } from "../interfaces/IUser";

export const registerUser = async (fullName: string, email: string, password: string): Promise<IUser | null> => {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already in use.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        fullName,
        email,
        password: hashedPassword,
    });

    return await user.save();
};

export const loginUser = async (email: string, password: string): Promise<string | null> => {
    // Step 1: Look for the user in the database by email
    const user = await User.findOne({ email });

    // Step 2: Check if the user exists and if the password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
        // If the user does not exist or the password is incorrect, return null
        return null;
    }

    // Step 3: Generate a token if the user is found and password matches
    const token = generateToken(
        {
            userFullName: user.fullName,
            userEmail: user.email
        }
    );

    // Step 4: Return the generated token
    return token;
};
