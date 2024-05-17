import { z } from "zod";
import {
  userSchema,
  userPayloadCreateSchema,
  userReturnSchema,
  userBodyCreateSchema,
  sessionReturnSchema
} from "../schemas";
import { userPayloadReturnSchema } from "../schemas/user.schemas";

type user = z.infer<typeof userSchema>;
type userPayloadCreate = z.infer<typeof userPayloadCreateSchema>;
type userPayloadReturn = z.infer<typeof userPayloadReturnSchema>;
type userReturn = z.infer<typeof userReturnSchema>;
type userBodyCreate = z.infer<typeof userBodyCreateSchema>
type userSessionReturn = z.infer<typeof sessionReturnSchema>

interface IuserService {
  list(): Promise<Array<userReturn>>;
  create(payload: userPayloadCreate): Promise<userReturn>;
  retrieve(id: number): Promise<userReturn>;
  isUsernameUnique(username: string): Promise<boolean>;
}

export { 
  user, 
  userPayloadCreate,
  userPayloadReturn, 
  userReturn, 
  IuserService, 
  userBodyCreate, 
  userSessionReturn 
};