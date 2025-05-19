import prisma from '../lib/prisma';
import { CreateInstructorInput, UpdateInstructorInput } from './types';

export class InstructorRepository {
    async findById(id: string) {
        return await prisma.instructor.findUnique({
            where: { id },
        });
    }

    async findByEspeciality(especiality: string) {
        return await prisma.instructor.findMany({
            where: { especiality },
        });
    }

    async findByName(name: string) {
        return await prisma.instructor.findFirst({
            where: { name },
        });
    }

    async save({ name, especiality }: CreateInstructorInput) {
        return await prisma.instructor.create({
            data: {
                name,
                especiality,
            },
        });
    }

    async deleteById(id: string) {
        await prisma.instructor.delete({ where: { id } });
    }

    async update(id: string, data: UpdateInstructorInput) {
        return await prisma.instructor.update({
            where: { id },
            data,
        });
    }

    async getAllInstructors() {
        return await prisma.instructor.findMany();
    }

    async findInstructorCourse(id: string) {
        return await prisma.instructor.findUnique({
            where: { id },
            include: { Course: true },
        });
    }
}
