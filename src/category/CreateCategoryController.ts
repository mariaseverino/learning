import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateCategoryInput } from './types';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export class CreateCategoryController {
    async handle(
        request: FastifyRequest<{
            Headers: { authorization: string };
            Body: CreateCategoryInput;
        }>,
        reply: FastifyReply
    ) {
        const data = request.body;

        const createCategoryUseCase = new CreateCategoryUseCase();

        const response = await createCategoryUseCase.execute(data);

        return reply.status(201).send(response);
    }
}
