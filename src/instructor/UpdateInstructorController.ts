import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateInstructorInput } from './types';
import { UpdateInstructorUseCase } from './UpdateInstructorUseCase';

export class UpdateInstructorController {
    async handle(
        request: FastifyRequest<{
            Headers: { authorization: string };
            Params: { id: string };
            Body: UpdateInstructorInput;
        }>,
        reply: FastifyReply
    ) {
        const courseId = request.params.id;
        const data = request.body;

        const updateInstructorUseCase = new UpdateInstructorUseCase();

        const response = await updateInstructorUseCase.execute(courseId, data);

        return reply.status(200).send(response);
    }
}
