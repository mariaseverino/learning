import z from 'zod';

export const createInstructorSchema = z.object({
    name: z.string(),
    especiality: z.string(),
});

export const updateInstructorSchema = z.object({
    especiality: z.string(),
});

export const createInstructorSchemaResponse = z.object({
    id: z.string(),
    name: z.string(),
    especiality: z.string(),
});

export const getInstructorsSchema = z.array(createInstructorSchemaResponse);

export type CreateInstructorInput = z.infer<typeof createInstructorSchema>;
export type UpdateInstructorInput = z.infer<typeof updateInstructorSchema>;
