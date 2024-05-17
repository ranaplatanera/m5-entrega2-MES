import { Router } from "express";
import { UserController } from "../controllers";
import { ensure } from "../middlewares";
import { userBodyCreateSchema, userPayloadCreateSchema } from "../schemas";
import { auth } from "../middlewares";
import { UserService } from "../services/UserService";
import { container } from "tsyringe";
import { sessionController } from "../controllers/SessionController";

export const userRouter = Router();
container.registerSingleton("userService", UserService);
const userController = container.resolve(UserController);

userRouter.post(
  "",
  ensure.bodyIsValid(userPayloadCreateSchema),
  userController.create
);

userRouter.post(
  "/login",
  ensure.bodyIsValid(userBodyCreateSchema),
  sessionController.login
);
userRouter.get(
  "/profile",
  auth.isAuthenticated,
  userController.retrieve
);