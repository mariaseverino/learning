import { FastifyReply, FastifyRequest } from 'fastify';
import { ListStundetEnrollCoursesUseCase } from './ListStundetEnrollCoursesUseCase';

export class ListStundentEnrollCoursesController {
    async handle(
        request: FastifyRequest<{
            Headers: { authorization: string };
            Params: { id: string };
        }>,
        reply: FastifyReply
    ) {
        const studentId = request.params.id;

        const listStundentEnrollCoursesUseCase =
            new ListStundetEnrollCoursesUseCase();

        const response = listStundentEnrollCoursesUseCase.execute(studentId);

        return reply.status(200).send(response);
    }
}
