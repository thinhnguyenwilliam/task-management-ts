import { Express } from "express";
import tasksRoutes from "./taskRoutes";
export const routesClient = (app: Express) => {
    app.use("/api/client/tasks", tasksRoutes);
}