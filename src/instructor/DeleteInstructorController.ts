import { FastifyReply, FastifyRequest } from 'fastify';
import { DeleteInstructorUseCase } from './DeleteInstructorUseCase';

export class DeleteInstructorController {
    async handle(
        request: FastifyRequest<{
            Headers: { authorization: string };
            Params: { id: string };
        }>,
        reply: FastifyReply
    ) {
        const courseId = request.params.id;

        const deleteInstructorUseCase = new DeleteInstructorUseCase();

        await deleteInstructorUseCase.execute(courseId);

        return reply.status(200).send();
    }
}

//135 ligar nss
