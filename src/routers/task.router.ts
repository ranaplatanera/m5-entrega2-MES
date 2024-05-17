import { Router } from "express";
import { taskController } from "../controllers";
import { ensure, ensureTask, ensureCategory, auth } from "../middlewares";
import { taskCreateSchema, taskUpdateSchema } from "../schemas";

export const taskRouter = Router();


taskRouter.get(
    "", 
    ensureCategory.IsNameValid, 
    ensureCategory.idExists, 
    auth.isAuthenticated,
    taskController.list
);
taskRouter.use(
    "/:id", 
    ensureTask.idExists,
    auth.isAuthenticated,
    ensureTask.isTaskOwner
);
taskRouter.get(
    "/:id", 
    auth.isAuthenticated, 
    ensureTask.isTaskOwner, 
    taskController.retrieve
);
taskRouter.post(
    "", 
    auth.isAuthenticated,
    ensure.bodyIsValid(taskCreateSchema),
    ensureCategory.idExists, 
    taskController.create,
);
taskRouter.patch("/:id", ensure.bodyIsValid(taskUpdateSchema), taskController.update)
taskRouter.delete("/:id", taskController.delete);
//taskRouter.use("", ensureCategory.idExists);