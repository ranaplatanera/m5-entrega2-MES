import { Request, Response } from "express";
import { SessionService } from "../services";
import { status } from "../utils/httpStatusCode";

export class SessionController {
  private service = new SessionService();

  public login = async (req: Request, res: Response): Promise<Response> => {
    const user = await this.service.login(req.body);

    return res.status(status.HTTP_200_OK).json(user);
  };
}

export const sessionController = new SessionController();