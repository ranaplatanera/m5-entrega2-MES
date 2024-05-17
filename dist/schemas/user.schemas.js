"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTokenSchema = exports.userBodyCreateSchema = exports.userReturnSchema = exports.userPayloadReturnSchema = exports.userPayloadCreateSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().max(50),
    email: zod_1.z.string().max(50),
    password: zod_1.z.string().max(255),
});
exports.userSchema = userSchema;
const userPayloadReturnSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
});
exports.userPayloadReturnSchema = userPayloadReturnSchema;
const userPayloadCreateSchema = userSchema.omit({
    id: true,
});
exports.userPayloadCreateSchema = userPayloadCreateSchema;
const userReturnSchema = userSchema.omit({ password: true });
exports.userReturnSchema = userReturnSchema;
const userBodyCreateSchema = zod_1.z.object({
    email: zod_1.z.string().max(50),
    password: zod_1.z.string().max(255),
});
exports.userBodyCreateSchema = userBodyCreateSchema;
const userTokenSchema = zod_1.z.object({
    accessToken: zod_1.z.string(),
});
exports.userTokenSchema = userTokenSchema;
