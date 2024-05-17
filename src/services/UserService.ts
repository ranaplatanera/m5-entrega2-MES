import {
  userPayloadCreate,
  userReturn,
  IuserService,
} from "../interfaces";
import { prisma } from "../database/prisma";
import { userReturnSchema } from "../schemas";
import { hash } from "bcryptjs";
import { injectable } from "tsyringe";
import { status } from "../utils/httpStatusCode";
import { AppError } from "../errors/AppError";
import { userPayloadReturn } from "../interfaces/user.interfaces";

  
@injectable()
export class UserService implements IuserService {
  private user = prisma.user;
  
  public isUsernameUnique = async (name: string): Promise<boolean> => {
    const foundUser = await this.user.findFirst({ where: { name } });

    return Boolean(foundUser);
  };

  public isUserEmailUnique = async (email: string): Promise<boolean> => {
    const foundUser = await this.user.findFirst({ where: { email } });

    return Boolean(foundUser);
  };
  
  public list = async (): Promise<Array<userReturn>> => {
    const users = await this.user.findMany();
  
    return userReturnSchema.array().parse(users);
  };
  
  public retrieve = async (id: number): Promise<userReturn> => {
    const user = await this.user.findFirst({
      where: { id: id },
    });
  
    return userReturnSchema.parse(user);
  };

  public create = async (
    payload: userPayloadCreate
  ): Promise<userReturn> => {
    const founduser = await this.isUsernameUnique(payload.name);
  
    // if (founduser) {
    //   throw new AppError("Username already exists.", status.HTTP_409_CONFLICT);
    // }

    const foundemail = await this.isUserEmailUnique(payload.email);
  
    if (foundemail) {
      throw new AppError("This email is already registered.", status.HTTP_409_CONFLICT);
    }
  
    payload.password = await hash(payload.password, 10);
  
    const newuser = await this.user.create({ data: payload });
  
    return userReturnSchema.parse(newuser);
  };
}