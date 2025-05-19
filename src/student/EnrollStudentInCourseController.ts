import { FastifyReply, FastifyRequest } from 'fastify';
import { EnrollStudentInCourseUseCase } from './EnrollStudentInCourseUseCase';
import { EnrollStudentInCourseInput } from './types';

export class EnrollStudentInCourseController {
    async handle(
        request: FastifyRequest<{
            Headers: { authorization: string };
            Params: EnrollStudentInCourseInput;
        }>,
        reply: FastifyReply
    ) {
        const { studentId, courseId } = request.params;

        const enrollStudentInCourseUseCase = new EnrollStudentInCourseUseCase();

        await enrollStudentInCourseUseCase.execute(studentId, courseId);

        return reply.status(201).send();
    }
}
