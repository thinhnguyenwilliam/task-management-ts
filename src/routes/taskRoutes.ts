import { Router, Request, Response } from "express";
import { Task } from "../models/taskModel";

const router = Router();


router.get("/tasks", async (req: Request, res: Response) => {
    const tasks = await Task.find({
        deleted: false
    });
    res.status(200).json(tasks); // HTTP 200 OK
});

router.get("/tasks/detail/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted: false
    });
    res.status(200).json(task); // HTTP 200 OK
});


export default router;
