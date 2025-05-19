import prisma from '../lib/prisma';
import { CreateCategoryInput } from './types';

export class CategoryRepository {
    async findById(id: string) {
        return await prisma.category.findUnique({
            where: { id },
        });
    }

    async findByName(name: string) {
        return await prisma.category.findUnique({
            where: { name },
        });
    }

    async save({ name }: CreateCategoryInput) {
        return await prisma.category.create({
            data: {
                name,
            },
        });
    }
    async getCategories() {
        return await prisma.category.findMany();
    }

    async deleteById(id: string) {
        await prisma.category.delete({ where: { id } });
    }

    async findCategoryCourse(id: string) {
        return await prisma.category.findUnique({
            where: { id },
            select: { courses: true },
        });
    }
}
