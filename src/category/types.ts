import z from 'zod';

export const createCategorySchema = z.object({
    name: z.string(),
});

export const createCategorySchemaResponse = z.object({
    id: z.string(),
    name: z.string(),
});

export const getCategoriesSchema = z.array(createCategorySchemaResponse);

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
