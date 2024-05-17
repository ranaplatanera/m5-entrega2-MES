"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureTask = exports.EnsureTaskMiddleware = void 0;
const prisma_1 = require("../database/prisma");
const AppError_1 = require("../errors/AppError");
const httpStatusCode_1 = require("../utils/httpStatusCode");
class EnsureTaskMiddleware {
    idExists = async (req, res, next) => {
        const foundTask = await prisma_1.prisma.task.findFirst({
            where: {
                id: Number(req.params.id),
            },
        });
        if (!foundTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.locals = { foundTask };
        return next();
    };
    isTaskOwner = async (req, res, next) => {
        const decoded = res.locals.decoded.id;
        const taskId = Number(req.params.id);
        const task = await prisma_1.prisma.task.findFirst({
            where: {
                id: taskId,
            },
        });
        if (decoded !== task?.userId) {
            throw new AppError_1.AppError("This user is not the task owner", httpStatusCode_1.status.HTTP_403_FORBIDDEN);
        }
        return next();
    };
}
exports.EnsureTaskMiddleware = EnsureTaskMiddleware;
exports.ensureTask = new EnsureTaskMiddleware();
