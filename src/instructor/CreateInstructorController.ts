import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateInstructorUseCase } from './CreateInstructorUseCase';
import { CreateInstructorInput } from './types';

export class CreateInstructorController {
    async handle(
        request: FastifyRequest<{
            Headers: { authorization: string };
            Body: CreateInstructorInput;
        }>,
        reply: FastifyReply
    ) {
        const data = request.body;

        const useCase = new CreateInstructorUseCase();

        const response = await useCase.execute(data);

        return reply.status(201).send(response);
    }
}
