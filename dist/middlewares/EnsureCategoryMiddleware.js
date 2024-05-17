"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureCategory = exports.EnsureCategoryMiddleware = void 0;
const prisma_1 = require("../database/prisma");
const AppError_1 = require("../errors/AppError");
const httpStatusCode_1 = require("../utils/httpStatusCode");
class EnsureCategoryMiddleware {
    idExists = async (req, res, next) => {
        const categoryId = req.body.categoryId;
        if (!categoryId) {
            return next();
        }
        const foundCategory = await prisma_1.prisma.category.findFirst({
            where: {
                id: req.body.categoryId,
            },
        });
        if (!foundCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.locals = { foundCategory };
        return next();
    };
    idValid = async (req, res, next) => {
        const foundCategory = await prisma_1.prisma.category.findFirst({
            where: {
                id: Number(req.params.id),
            },
        });
        if (!foundCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.locals = { foundCategory };
        return next();
    };
    IsNameValid = async (req, res, next) => {
        const categoryName = req.query.category
            ? String(req.query.category)
            : undefined;
        ;
        if (categoryName) {
            const foundCategory = await prisma_1.prisma.category.findFirst({
                where: { name: { equals: categoryName, mode: "insensitive" } },
            });
            if (!foundCategory) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.locals = { foundCategory };
        }
        return next();
    };
    isCategOwner = async (req, res, next) => {
        const decoded = res.locals.decoded.id;
        const taskId = Number(req.params.id);
        const task = await prisma_1.prisma.task.findFirst({
            where: {
                id: taskId,
            },
        });
        if (decoded !== task?.userId) {
            throw new AppError_1.AppError("This user is not the category owner", httpStatusCode_1.status.HTTP_403_FORBIDDEN);
        }
        return next();
    };
}
exports.EnsureCategoryMiddleware = EnsureCategoryMiddleware;
exports.ensureCategory = new EnsureCategoryMiddleware();
