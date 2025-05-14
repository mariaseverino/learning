import { FastifyReply, FastifyRequest } from 'fastify';
import { ListCoursesUseCase } from './ListCoursesUseCase';

export class ListCoursesController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listCoursesUseCase = new ListCoursesUseCase();

        const response = await listCoursesUseCase.execute();

        return reply.status(200).send(response);
    }
}
