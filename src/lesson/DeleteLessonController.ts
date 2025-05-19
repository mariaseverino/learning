import { FastifyReply, FastifyRequest } from 'fastify';
import { DeleteLessonUseCase } from './DeleteLessonUseCase';

export class DeleteLessonController {
    async handle(
        request: FastifyRequest<{
            Headers: { authorization: string };
            Params: { id: string };
        }>,
        reply: FastifyReply
    ) {
        const lessonId = request.params.id;

        const deleteLessonUseCase = new DeleteLessonUseCase();

        await deleteLessonUseCase.execute(lessonId);

        return reply.status(200).send();
    }
}
