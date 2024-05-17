"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const prisma_1 = require("../database/prisma");
const schemas_1 = require("../schemas");
class CategoryService {
    category = prisma_1.prisma.category;
    create = async (payload, authHeader) => {
        const newpayload = { ...payload, userId: authHeader };
        const newCategory = await prisma_1.prisma.category.create({ data: newpayload });
        return schemas_1.categorySchema.parse(newCategory);
    };
    delete = async (categoryId) => {
        await prisma_1.prisma.category.delete({ where: { id: categoryId } });
    };
}
exports.CategoryService = CategoryService;
