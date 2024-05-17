import { userBodyCreate, userSessionReturn } from "../interfaces";
import { prisma } from "../database/prisma";
import { sessionReturnSchema } from "../schemas";
import { compare } from "bcryptjs";
import { AppError } from "../errors/AppError";
import { sign } from "jsonwebtoken";
import { jwtConfig } from "../configs";
import { status } from "../utils/httpStatusCode";

export class SessionService {
  private user = prisma.user;

  public login = async ({
    email,
    password,
  }: userBodyCreate): Promise<userSessionReturn> => {
    const foundUser = await this.user.findFirst({
    where: { email: email }, 
    });

    if (!foundUser) {
      throw new AppError("User not exists", status.HTTP_404_NOT_FOUND);
    }

    const passwordMatch = await compare(password, foundUser.password);

    if (!passwordMatch) {
      throw new AppError("Email and password doesn't match ", status.HTTP_401_UNAUTHORIZED);
    }

    const { secret, expiresIn } = jwtConfig();

    const token = sign({
      id: foundUser.id,
     },
      secret,
      {
        expiresIn: expiresIn,
      }
    );

    return sessionReturnSchema.parse({ accessToken: token, user: foundUser });  
  }
  
}