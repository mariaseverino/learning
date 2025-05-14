import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { AuthenticateUserInput } from './types';

export class AuthenticateUserController {
    async handle(
        request: FastifyRequest<{ Body: AuthenticateUserInput }>,
        reply: FastifyReply
    ) {
        const data = request.body;

        const authenticateUserUseCase = new AuthenticateUserUseCase();

        const response = await authenticateUserUseCase.exexute(data);

        return reply.status(200).send(response);
    }
}
