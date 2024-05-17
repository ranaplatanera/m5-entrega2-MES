import { Router } from "express";
import { CategoryController } from "../controllers";
import { auth, ensure, ensureCategory } from "../middlewares";
import { categoryCreateSchema } from "../schemas";

export const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post(
    "", 
    auth.isAuthenticated, 
    ensure.bodyIsValid(categoryCreateSchema),
    categoryController.create
);
// categoryRouter.use("/:id", ensureCategory.idValid);
categoryRouter.delete(
    "/:id",
    ensureCategory.idValid, 
    auth.isAuthenticated, 
    ensureCategory.isCategOwner, 
    categoryController.delete
)