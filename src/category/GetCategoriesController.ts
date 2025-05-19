import { FastifyReply, FastifyRequest } from 'fastify';
import { GetCategoriesUseCase } from './GetCategoriesUseCase';

export class GetCategoriesController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const getCategoriesUseCase = new GetCategoriesUseCase();

        const response = await getCategoriesUseCase.execute();

        return reply.status(200).send(response);
    }
}
