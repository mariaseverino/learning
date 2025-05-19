import z from 'zod';
import { CreateLessonController } from '../lesson/CreateLessonController';
import {
    createLessonSchema,
    getCourseLessonsSchemaResponse,
    updateLessonSchema,
} from '../lesson/types';
import { FastifyTypeInstance } from '../types';
import { UpdateLessonController } from '../lesson/UpdateLessonController';
import { DeleteLessonController } from '../lesson/DeleteLessonController';
import { ListCoursesController } from '../course/ListCoursesController';
import { ensureAuthenticated } from '../middleware/ensure-authenticated';
import { ensureHasAuthorization } from '../middleware/ensure-has-authorization';

export class LessonRoutes {
    private createLessonController: CreateLessonController;
    private updateLessonController: UpdateLessonController;
    private deleteLessonController: DeleteLessonController;
    private listCourseLessonsController: ListCoursesController;

    constructor(private readonly app: FastifyTypeInstance) {
        this.createLessonController = new CreateLessonController();
        this.updateLessonController = new UpdateLessonController();
        this.deleteLessonController = new DeleteLessonController();
        this.listCourseLessonsController = new ListCoursesController();
    }

    async registerRoutes() {
        this.app.post(
            '/lesson/new',
            {
                schema: {
                    tags: ['Lesson'],
                    description: 'Create new lesson',
                    headers: z.object({
                        authorization: z.string(),
                    }),
                    body: createLessonSchema,
                    response: {
                        201: z.null().describe('Lesson created'),
                    },
                    404: z.object({
                        message: z.string(),
                    }),
                    409: z.object({
                        message: z.string(),
                    }),
                },
                preHandler: [ensureAuthenticated, ensureHasAuthorization],
            },
            this.createLessonController.handle
        );
        this.app.get(
            '/course/:courseId/lessons',
            {
                schema: {
                    tags: ['Lesson'],
                    description: 'list lessons',
                    headers: z.object({
                        authorization: z.string(),
                    }),
                    response: {
                        201: {
                            description: 'Successful response',
                            type: 'object',
                            properties: getCourseLessonsSchemaResponse,
                        },
                        404: z.object({
                            message: z.string(),
                        }),
                    },
                },
                preHandler: ensureAuthenticated,
            },
            this.listCourseLessonsController.handle
        );
        this.app.put(
            '/lesson/:id',
            {
                schema: {
                    tags: ['Lesson'],
                    description: 'Update lesson',
                    headers: z.object({
                        authorization: z.string(),
                    }),
                    body: updateLessonSchema,
                    params: z.object({
                        id: z.string(),
                    }),
                    response: {
                        200: z.null().describe('Lesson updated'),
                        404: z.object({
                            message: z.string(),
                        }),
                    },
                },
                preHandler: [ensureAuthenticated, ensureHasAuthorization],
            },
            this.updateLessonController.handle
        );
        this.app.delete(
            '/lesson/:id',
            {
                schema: {
                    tags: ['Lesson'],
                    description: 'Deleted lesson',
                    headers: z.object({
                        authorization: z.string(),
                    }),
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
                        409: z.object({
                            message: z.string(),
                        }),
                    },
                },
                preHandler: [ensureAuthenticated, ensureHasAuthorization],
            },
            this.deleteLessonController.handle
        );
    }
}
