import { FastifyReply, FastifyRequest } from 'fastify';
import { verifyToken } from '../auth/providers';
import { HeadersInput } from '../auth/types';

export async function ensureAuthenticated(
    request: FastifyRequest<{ Headers: HeadersInput }>,
    reply: FastifyReply
) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return reply.status(401).send({
            message: 'Token is misssing',
        });
    }
    try {
        verifyToken(authToken);
    } catch (err) {
        return reply.status(401).send({
            message: 'Token is invalid',
        });
    }
}
