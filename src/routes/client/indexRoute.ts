import { Express } from "express";
import tasksRoutes from "./taskRoutes";
import UserRouter from "./userRoutes";
export const routesClient = (app: Express) => {
    app.use("/api/client/tasks", tasksRoutes);
    app.use("/api/client/users", UserRouter);
}