import { userSchema, userTokenSchema } from "./user.schemas";

const sessionReturnSchema = userTokenSchema.pick({
    accessToken: true
  }).extend({
    user: userSchema.omit ({
      password: true,
    })
})  

export { sessionReturnSchema };