import "reflect-metadata";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import { taskRouter, categoryRouter, userRouter } from "./routers";
import { handleErrors } from "./middlewares";

export const app = express();

app.use(helmet());

app.use(express.json());

app.use("/tasks", taskRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);

app.use(handleErrors);