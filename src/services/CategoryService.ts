import { Category, CategoryCreate } from "../interfaces";
import { prisma } from "../database/prisma";
import { categorySchema } from "../schemas";

export class CategoryService {
    private category = prisma.category;

    public create = async (payload: CategoryCreate, authHeader: number): Promise<Category> => {
        const newpayload = { ...payload, userId: authHeader };
        const newCategory = await prisma.category.create({ data: newpayload });
    
        return categorySchema.parse(newCategory);
    };

    public delete = async (categoryId: number): Promise<void> => {
        await prisma.category.delete({ where: { id: categoryId } });
    };

}