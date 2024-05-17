"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryCreateSchema = exports.categorySchema = void 0;
const zod_1 = require("zod");
const categorySchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().max(200),
    userId: zod_1.z.number().positive()
});
exports.categorySchema = categorySchema;
const categoryCreateSchema = categorySchema.omit({ id: true }).partial({ userId: true });
exports.categoryCreateSchema = categoryCreateSchema;
