import z from 'zod';

export const EnrollStudentInCourseSchema = z.object({
    studentId: z.string(),
    courseId: z.string(),
});

export const StudentDoneCourseLessonSchema = z.object({
    studentId: z.string(),
    lessonId: z.string(),
});

export type EnrollStudentInCourseInput = z.infer<
    typeof EnrollStudentInCourseSchema
>;

export type StudentDoneCourseLessonInput = z.infer<
    typeof StudentDoneCourseLessonSchema
>;

export const getEnrollCoursesResponseSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    thumbnailUrl: z.string(),
    instructorId: z.string(),
});

export const getCurrentStudentResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    courses: z.array(getEnrollCoursesResponseSchema), // 👈 Aqui muda
});

export const completeLessonSchema = z.object({
    studentId: z.string(),
    lessonId: z.string(),
});

export type StudentDoneCourseLessonParams = z.infer<
    typeof completeLessonSchema
>;
