import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";
import { status } from "../utils/httpStatusCode";

export class EnsureTaskMiddleware {
  public idExists = async (req: Request, res: Response, next: NextFunction) => {
    const foundTask = await prisma.task.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!foundTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.locals = { foundTask };

    return next();
  };

  public isTaskOwner = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const  decoded  = res.locals.decoded.id; 
    const taskId = Number(req.params.id);
    
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
      },
    });

    if (decoded !== task?.userId) {
      throw new AppError(
        "This user is not the task owner",
        status.HTTP_403_FORBIDDEN
      );
    }

    return next();
  };

}

export const ensureTask = new EnsureTaskMiddleware();