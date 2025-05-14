import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateLessonInput } from './types';
import { CreateLessonUseCase } from './CreateLessonUseCase';

export class CreateLessonController {
    async handle(
        request: FastifyRequest<{ Body: CreateLessonInput }>,
        reply: FastifyReply
    ) {
        const data = request.body;

        const createLessonUseCase = new CreateLessonUseCase();

        await createLessonUseCase.execute(data);

        return reply.status(201).send();
    }
}
