import z from 'zod';
import { CreateLessonController } from '../lesson/CreateLessonController';
import { createLessonSchema, updateLessonSchema } from '../lesson/types';
import { FastifyTypeInstance } from '../types';
import { UpdateLessonController } from '../lesson/UpdateLessonController';
import { DeleteLessonController } from '../lesson/DeleteLessonController';

export class LessonRoutes {
    private createLessonController: CreateLessonController;
    private updateLessonController: UpdateLessonController;
    private deleteLessonController: DeleteLessonController;

    constructor(private readonly app: FastifyTypeInstance) {
        this.createLessonController = new CreateLessonController();
        this.updateLessonController = new UpdateLessonController();
        this.deleteLessonController = new DeleteLessonController();
    }

    async registerRoutes() {
        this.app.post(
            '/lesson/new',
            {
                schema: {
                    tags: ['Lesson'],
                    description: 'Create new lesson',
                    body: createLessonSchema,
                    response: {
                        201: z.null().describe('Lesson created'),
                    },
                },
            },
            this.createLessonController.handle
        );
        this.app.put(
            '/lesson/:id',
            {
                schema: {
                    tags: ['Lesson'],
                    description: 'Update lesson',
                    body: updateLessonSchema,
                    params: z.object({
                        id: z.string(),
                    }),
                    response: {
                        200: z.null().describe('Lesson updated'),
                    },
                },
                // preHandler: ensureAuthenticated,
            },
            this.updateLessonController.handle
        );
        this.app.delete(
            '/lesson/:id',
            {
                schema: {
                    tags: ['Lesson'],
                    description: 'Deleted lesson',
                    params: z.object({
                        id: z.string(),
                    }),
                    response: {
                        200: z.array(
                            z.object({
                                message: z.string(),
                            })
                        ),
                        404: z.object({
                            message: z.string(),
                        }),
                    },
                },
                // preHandler: ensureAuthenticated,
            },
            this.deleteLessonController.handle
        );
    }
}
