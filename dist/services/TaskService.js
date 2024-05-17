"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const prisma_1 = require("../database/prisma");
const schemas_1 = require("../schemas");
class TaskService {
    task = prisma_1.prisma.task;
    list = async (categoryName, authHeader) => {
        const userId = authHeader;
        //Crear una función que filtre las búsquedas sólo para las del 
        //userId del token
        if (categoryName) {
            const categoryTasks = await this.task.findMany({
                where: { category: { name: { equals: categoryName, mode: "insensitive" } }, user: { id: userId } },
                include: { category: true }
            });
            return schemas_1.TaskRetrieveSchemaByCat.array().parse(categoryTasks);
        }
        ;
        const tasks = await this.task.findMany({
            where: { user: { id: userId } },
            include: { category: true },
        });
        return schemas_1.TaskRetrieveSchema.array().parse(tasks);
    };
    retrieve = async (taskId) => {
        console.log(taskId);
        const task = await this.task.findUnique({
            where: { id: taskId },
            include: { category: true },
        });
        return schemas_1.TaskRetrieveSchema.parse(task);
    };
    create = async (payload, authHeader) => {
        const newpayload = { ...payload, userId: authHeader };
        const newTask = await prisma_1.prisma.task.create({ data: newpayload });
        return schemas_1.taskSchema.parse(newTask);
    };
    update = async (taskId, payload) => {
        const updatedTask = await prisma_1.prisma.task.update({ where: { id: taskId }, data: payload });
        return schemas_1.taskSchema.parse(updatedTask);
    };
    delete = async (taskId) => {
        await prisma_1.prisma.task.delete({ where: { id: taskId } });
    };
}
exports.TaskService = TaskService;
