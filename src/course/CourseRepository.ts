import prisma from '../lib/prisma';
import { CreateCourseInput, UpdateCourseInput } from './types';

export class CourseRepository {
    async findById(id: string) {
        return await prisma.course.findUnique({
            where: { id },
            include: { students: true },
        });
    }

    async findByTitle(title: string) {
        return await prisma.course.findFirst({
            where: { title },
        });
    }

    async save({
        title,
        description,
        thumbnailUrl,
        categories,
        instructor,
    }: CreateCourseInput) {
        return await prisma.course.create({
            data: {
                title,
                description,
                thumbnailUrl,
                categories: {
                    connect: categories.map((id: string) => ({ id })),
                },
                instructor: {
                    connect: { id: instructor },
                },
            },
        });
    }
    async getAllCourses() {
        return await prisma.course.findMany({
            include: {
                lessons: {
                    select: {
                        id: true,
                        title: true,
                        videoUrl: true,
                    },
                },
            },
        });
    }

    async deleteById(id: string) {
        await prisma.course.delete({ where: { id } });
    }

    async update(id: string, data: UpdateCourseInput) {
        const { categories, instructor, ...rest } = data;

        return await prisma.course.update({
            where: { id },
            data: {
                ...rest,
                ...(categories && {
                    categories: {
                        set: categories.map((id) => ({ id })),
                    },
                }),
                ...(instructor && {
                    instructor: {
                        connect: { id: instructor },
                    },
                }),
            },
        });
    }
}
