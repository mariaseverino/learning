import prisma from '../lib/prisma';

export class StudentRepository {
    async findById(id: string) {
        return await prisma.user.findFirst({
            where: { id, role: 'student' },
            include: { courses: true },
        });
    }
    async enroll(studentId: string, courseId: string) {
        await prisma.user.update({
            where: { id: studentId },
            data: {
                courses: {
                    connect: { id: courseId },
                },
            },
        });
    }

    async getEnrollCourses(stundentId: string, id: string) {
        const student = await prisma.user.findFirst({
            where: { id: stundentId, role: 'student' },
            include: { courses: true },
        });

        // return student!.courses || [];
    }
}
