import { Request, Response } from "express";
import { UserService } from "../services";
import { IuserService } from "../interfaces";
import { status } from "../utils/httpStatusCode";
import { injectable, inject } from "tsyringe";

@injectable()
export class UserController {

  constructor(@inject(UserService) private service: IuserService) {}

  public create = async (req: Request, res: Response): Promise<Response> => {
    const user = await this.service.create(req.body);

    return res.status(status.HTTP_201_CREATED).json(user);
  };

  public retrieve = async (req: Request, res: Response): Promise<Response> => {
    const user = await this.service.retrieve(req.body.id);

    return res.status(status.HTTP_200_OK).json(user);
  };
}