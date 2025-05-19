import { FastifyReply, FastifyRequest } from 'fastify';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

export class DeleteCategoryController {
    async handle(
        request: FastifyRequest<{
            Headers: { authorization: string };
            Params: { id: string };
        }>,
        reply: FastifyReply
    ) {
        const courseId = request.params.id;

        const deleteCategoryUseCase = new DeleteCategoryUseCase();

        await deleteCategoryUseCase.execute(courseId);

        return reply.status(200).send();
    }
}

//135 ligar nss
