import { z } from "zod";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50),
  email: z.string().max(50),
  password: z.string().max(255),
});

const userPayloadReturnSchema = z.object({
  id: z.number().positive(),
})  

const userPayloadCreateSchema = userSchema.omit({
  id: true,
})

const userReturnSchema = userSchema.omit({ password: true });

const userBodyCreateSchema = z.object({
  email: z.string().max(50),
  password: z.string().max(255),
});

const userTokenSchema = z.object({
  accessToken: z.string(),
})

export { 
  userSchema, 
  userPayloadCreateSchema,
  userPayloadReturnSchema, 
  userReturnSchema, 
  userBodyCreateSchema, 
  userTokenSchema 
};