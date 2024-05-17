"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionReturnSchema = void 0;
const user_schemas_1 = require("./user.schemas");
const sessionReturnSchema = user_schemas_1.userTokenSchema.pick({
    accessToken: true
}).extend({
    user: user_schemas_1.userSchema.omit({
        password: true,
    })
});
exports.sessionReturnSchema = sessionReturnSchema;
