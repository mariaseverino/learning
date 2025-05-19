import { FastifyReply, FastifyRequest } from 'fastify';
import { ListLessonsUseCase } from './ListLessonsUseCase';

export class ListLessonsController {
    async handle(
        request: FastifyRequest<{ Params: { courseId: string } }>,
        reply: FastifyReply
    ) {
        const courseId = request.params.courseId;

        const lisLessonsUseCase = new ListLessonsUseCase();

        const response = await lisLessonsUseCase.execute(courseId);

        return reply.status(200).send(response);
    }
}
