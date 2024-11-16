import { Express } from "express";
import tasksRoutes from "./taskRoutes";
import userRouter from "./userRoutes";
export const routesClient = (app: Express) => {
    app.use("/api/client/tasks", tasksRoutes);
    app.use("/api/client/users", userRouter);
}