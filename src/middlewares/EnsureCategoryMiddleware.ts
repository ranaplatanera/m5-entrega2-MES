import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";
import { status } from "../utils/httpStatusCode";

export class EnsureCategoryMiddleware {
  public idExists = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.body.categoryId;

    if (!categoryId) { 
      return next();  
    }
    
    const foundCategory = await prisma.category.findFirst({
      where: {
        id: req.body.categoryId,
      },
    });

    if (!foundCategory) { 
      return res.status(404).json({ message: "Category not found" });   
    }
    
    res.locals = { foundCategory };

    return next(); 
  };

  public idValid = async (req: Request, res: Response, next: NextFunction) => {
    const foundCategory = await prisma.category.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.locals = { foundCategory };

    return next();
  };

  public IsNameValid = async (req: Request, res: Response, next: NextFunction) => {
    const categoryName = req.query.category
    ? String(req.query.category)
    : undefined;;
    
    if (categoryName) {
      const foundCategory = await prisma.category.findFirst({
        where: {name: {equals: categoryName, mode: "insensitive"} },

      }); 
  
      if (!foundCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.locals = { foundCategory };
    }
    
    return next();
  };

  public isCategOwner = async (
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
        "This user is not the category owner",
        status.HTTP_403_FORBIDDEN
      );
    }

    return next();
  };


}

export const ensureCategory = new EnsureCategoryMiddleware();