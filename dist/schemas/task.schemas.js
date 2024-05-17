"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRetrieveSchemaByCat = exports.TaskRetrieveSchema = exports.taskUpdateSchema = exports.taskCreateSchema = exports.taskSchema = void 0;
const zod_1 = require("zod");
const category_schemas_1 = require("./category.schemas");
const taskSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    title: zod_1.z.string().max(200),
    content: zod_1.z.string(),
    finished: zod_1.z.boolean().default(false),
    categoryId: zod_1.z.number().positive().nullish(),
    userId: zod_1.z.number().positive()
});
exports.taskSchema = taskSchema;
const taskCreateSchema = taskSchema.omit({ id: true }).partial({ userId: true });
exports.taskCreateSchema = taskCreateSchema;
const taskUpdateSchema = taskCreateSchema.partial({
    title: true,
    content: true,
    finished: true
});
exports.taskUpdateSchema = taskUpdateSchema;
const TaskRetrieveSchema = taskSchema.omit({
    categoryId: true
}).extend({
    category: category_schemas_1.categorySchema.nullish()
});
exports.TaskRetrieveSchema = TaskRetrieveSchema;
const TaskRetrieveSchemaByCat = taskSchema.omit({
    categoryId: true
}).extend({
    category: category_schemas_1.categorySchema
});
exports.TaskRetrieveSchemaByCat = TaskRetrieveSchemaByCat;
