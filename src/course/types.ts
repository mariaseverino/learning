import z from 'zod';

export const createCourseSchema = z.object({
    title: z.string(),
    description: z.string(),
    thumbnailUrl: z.string(),
});

export const createCourseSchemaResponse = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    thumbnailUrl: z.string(),
});

export const getCourseSchemaResponse = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    thumbnailUrl: z.string(),
    lessons: z.array(
        z.object({
            id: z.string(),
            title: z.string(),
            videoUrl: z.string(),
        })
    ),
});

export const listCoursesSchemaResponse = z.array(getCourseSchemaResponse);

export const uptadeCourseSchemaResponse = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    thumbnailUrl: z.string().optional(),
});

export const params = z.object({
    id: z.string(),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof uptadeCourseSchemaResponse>;
