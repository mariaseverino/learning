import { FastifyReply, FastifyRequest } from 'fastify';
import { DeleteCourseUseCase } from './DeleteCourseUseCase';

export class DeleteCourseController {
    async handle(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        const courseId = request.params.id;

        const deleteCourseUseCase = new DeleteCourseUseCase();

        await deleteCourseUseCase.execute(courseId);

        return reply.status(200).send();
    }
}

//135 ligar nss
