import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";

class HandleErrorsMiddleware{
    public static execute = (
        error: Error,
        req: Request,
        res: Response,
        next: NextFunction
      ): Response => {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({ message: error.message });
        }
    
        if (error instanceof JsonWebTokenError) {
          return res.status(401).json({ message: error.message });
        }

        if (error instanceof ZodError) {          
          return res.status(400).json({ errors: error.errors });
        }   
        return res.status(500).json({ message: "Internal Server Error" });
      };
}

export const handleErrors = HandleErrorsMiddleware.execute;