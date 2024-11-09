// src/app.ts
import express from "express";
import { routesClient } from "./routes/client/indexRoute";

const app = express();


// Middleware setup
app.use(express.json()); // to parse JSON body
app.use(express.urlencoded({ extended: true }));

// Client Routes
routesClient(app);

export default app;
