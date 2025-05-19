import { FastifyReply, FastifyRequest } from 'fastify';
import { GetInstructorsUseCase } from './GetInstructorsUseCase';

export class GetInstructorsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const getInstructorsUseCase = new GetInstructorsUseCase();

        const response = await getInstructorsUseCase.execute();

        return reply.status(200).send(response);
    }
}
