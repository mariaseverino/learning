import { FastifyReply, FastifyRequest } from 'fastify';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';
import { HeadersInput, RefreshTokenInput } from './types';

export class RefreshTokenController {
    async handle(
        request: FastifyRequest<{
            Headers: HeadersInput;
            Body: RefreshTokenInput;
        }>,
        reply: FastifyReply
    ) {
        const { refreshToken } = request.body;

        const useCase = new RefreshTokenUseCase();

        const token = await useCase.execute(refreshToken);
        console.log({ chegou: token });

        return reply.status(200).send(token);
    }
}
