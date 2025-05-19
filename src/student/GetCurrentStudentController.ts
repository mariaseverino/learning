import { FastifyReply, FastifyRequest } from 'fastify';
import { GetCurrentStudentUseCase } from './GetCurrentStudentUseCase';

export class GetCurrentStudentController {
    async handle(
        request: FastifyRequest<{
            Headers: { authorization: string };
            Params: { id: string };
        }>,
        reply: FastifyReply
    ) {
        const id = request.params.id;

        const getCurrentStudentUseCase = new GetCurrentStudentUseCase();

        const response = await getCurrentStudentUseCase.execute(id);

        console.log(response);

        return reply.status(200).send(response);
    }
}
