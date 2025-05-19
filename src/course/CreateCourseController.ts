import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateCourseUseCase } from './CreateCourseUseCase';
import { CreateCourseInput } from './types';

export class CreateCourseController {
    async handle(
        request: FastifyRequest<{
            Headers: { authorization: string };
            Body: CreateCourseInput;
        }>,
        reply: FastifyReply
    ) {
        const data = request.body;

        const createCourseUseCase = new CreateCourseUseCase();

        const response = await createCourseUseCase.execute(data);

        return reply.status(201).send(response);
    }
}
