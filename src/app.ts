// src/app.ts
import express from "express";
import taskRoutes from "./routes/taskRoutes";

const app = express();


// Middleware setup
app.use(express.json()); // to parse JSON body
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", taskRoutes); // mount product routes

export default app;
