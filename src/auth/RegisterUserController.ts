import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterUserUseCase } from './RegisterUserUseCase';
import { CreateUserInput } from './types';

export class RegisterUserController {
    async handle(
        request: FastifyRequest<{ Body: CreateUserInput }>,
        reply: FastifyReply
    ) {
        const data = request.body;

        const useCase = new RegisterUserUseCase();

        const response = await useCase.execute(data);

        return reply.status(201).send(response);
    }
}
