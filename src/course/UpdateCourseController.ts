import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateCourseInput } from './types';
import { UpdateCourseUseCase } from './UpdateCourseUseCase';

export class UpdateCourseController {
    async handle(
        request: FastifyRequest<{
            Headers: { authorization: string };
            Params: { id: string };
            Body: UpdateCourseInput;
        }>,
        reply: FastifyReply
    ) {
        const courseId = request.params.id;
        const data = request.body;

        const updateCourseUseCase = new UpdateCourseUseCase();

        const response = await updateCourseUseCase.execute(courseId, data);

        return reply.status(200).send(response);
    }
}
