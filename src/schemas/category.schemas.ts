import { z } from "zod";

const categorySchema = z.object({
    id: z.number().positive(),
    name: z.string().max(200),
    userId: z.number().positive()
  });

const categoryCreateSchema = categorySchema.omit({ id: true }).partial({ userId: true });

export { categorySchema, categoryCreateSchema };