import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateLessonInput } from './types';
import { UpdateLessonUseCase } from './UpdateLessonUseCase';

export class UpdateLessonController {
    async handle(
        request: FastifyRequest<{
            Headers: { authorization: string };
            Params: { id: string };
            Body: UpdateLessonInput;
        }>,
        reply: FastifyReply
    ) {
        const lessonId = request.params.id;
        const data = request.body;

        const updateLessonUseCase = new UpdateLessonUseCase();

        const response = await updateLessonUseCase.execute(lessonId, data);

        return reply.status(200).send(response);
    }
}
