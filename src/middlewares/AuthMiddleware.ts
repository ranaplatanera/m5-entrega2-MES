import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { verify } from "jsonwebtoken";
import { jwtConfig } from "../configs";
import { status } from "../utils/httpStatusCode";

class AuthMiddleware {
  public isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError("Token is required", status.HTTP_401_UNAUTHORIZED);
    }

    const [_, token] = authorization.split(" ");

    const { secret } = jwtConfig();
    const jwtPayload = verify(token, secret);
    console.log(jwtPayload);

    res.locals = {
      ...res.locals,
      decoded: jwtPayload,
    };

    return next();
  };

};  

export const auth = new AuthMiddleware();
