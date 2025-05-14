import prisma from '../lib/prisma';
import { CreateLessonInput, UpdateLessonInput } from './types';

export class LessonServices {
    async findById(id: string) {
        return await prisma.lesson.findUnique({
            where: { id },
        });
    }

    async findByTitle(title: string) {
        return await prisma.lesson.findFirst({
            where: { title },
        });
    }

    async save({ title, videoUrl, courseId }: CreateLessonInput) {
        return await prisma.lesson.create({
            data: {
                title,
                videoUrl,
                courseId,
            },
        });
    }

    async deleteById(id: string) {
        await prisma.lesson.delete({ where: { id } });
    }

    async update(id: string, data: UpdateLessonInput) {
        return await prisma.lesson.update({
            where: { id },
            data,
        });
    }

    async findLessonWithCourseById(id: string) {
        return await prisma.lesson.findUnique({
            where: { id },
            include: {
                course: {
                    include: { students: true },
                },
            },
        });
    }
}
