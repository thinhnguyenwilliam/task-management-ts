import express from 'express';
import { register, login } from '../../controllers/client/userController';
import { AuthMiddleware } from "../../middleware/authMiddleware";


const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);

// Protected route
userRouter.get("/profile", AuthMiddleware, (req, res) => {
    res.json({ message: "This is a protected route", user: (req as any).user });
  });

export default userRouter;
