import { StudentDoneCourseLessonUsecase } from './StudentDoneCourseLessonUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { StudentDoneCourseLessonParams } from './types';

export class StudentDoneCourseLessonController {
    async handle(
        request: FastifyRequest<{
            Headers: { authorization: string };
            Params: StudentDoneCourseLessonParams;
        }>,
        reply: FastifyReply
    ) {
        const data = request.params;

        const studentDoneCourseLessonUseCase =
            new StudentDoneCourseLessonUsecase();

        await studentDoneCourseLessonUseCase.execute(data);

        return reply.status(201).send();
    }
}
