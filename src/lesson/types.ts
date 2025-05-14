import z from 'zod';

export const createLessonSchema = z.object({
    title: z.string(),
    videoUrl: z.string(),
    courseId: z.string(),
});

export const updateLessonSchema = z.object({
    title: z.string(),
    videoUrl: z.string(),
});

export const updateLessonSchemaResponse = z.object({
    id: z.string(),
    courseId: z.string(),
    title: z.string(),
    videoUrl: z.string(),
    order: z.number(),
    done: z.boolean(),
});

export type CreateLessonInput = z.infer<typeof createLessonSchema>;
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;
