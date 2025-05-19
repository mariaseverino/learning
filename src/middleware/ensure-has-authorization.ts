import { FastifyReply, FastifyRequest } from 'fastify';
import { verifyIsUserHasAuthorization } from '../auth/providers';
import { HeadersInput } from '../auth/types';

export async function ensureHasAuthorization(
    request: FastifyRequest<{ Headers: HeadersInput }>,
    reply: FastifyReply
) {
    const authToken = request.headers.authorization;

    const hasAuthorization = await verifyIsUserHasAuthorization(authToken);

    if (!hasAuthorization) {
        return reply.status(401).send({
            message: 'User does not have authorization',
        });
    }
}
