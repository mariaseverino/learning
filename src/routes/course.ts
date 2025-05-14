import { ListCoursesController } from './../course/ListCoursesController';
import z from 'zod';
import {
    createCourseSchema,
    createCourseSchemaResponse,
    getCourseSchemaResponse,
    listCoursesSchemaResponse,
    params,
    uptadeCourseSchemaResponse,
} from '../course/types';
import { FastifyTypeInstance } from '../types';
import { CreateCourseController } from './../course/CreateCourseController';
import { ensureAuthenticated } from '../middleware/ensure-authenticated';
import { UpdateCourseController } from '../course/UpdateCourseController';
import { DeleteCourseController } from '../course/DeleteCourseController';

export class CourseRoutes {
    private createCourseController: CreateCourseController;
    private listCoursesController: ListCoursesController;
    private updateCourseController: UpdateCourseController;
    private deleteCourseController: DeleteCourseController;

    constructor(private readonly app: FastifyTypeInstance) {
        this.createCourseController = new CreateCourseController();
        this.listCoursesController = new ListCoursesController();
        this.updateCourseController = new UpdateCourseController();
        this.deleteCourseController = new DeleteCourseController();
    }

    async registerRoutes() {
        this.app.post(
            '/course/new',
            {
                schema: {
                    tags: ['Course'],
                    description: 'Create new course',
                    body: createCourseSchema,
                    response: {
                        201: {
                            description: 'Successful response',
                            type: 'object',
                            properties: createCourseSchemaResponse,
                        },
                    },
                },
            },
            this.createCourseController.handle
        );
        this.app.get(
            '/courses',
            {
                schema: {
                    tags: ['Course'],
                    description: 'list courses',
                    response: {
                        201: {
                            description: 'Successful response',
                            type: 'object',
                            properties: listCoursesSchemaResponse,
                        },
                    },
                },
                // preHandler: ensureAuthenticated,
            },
            this.listCoursesController.handle
        );
        this.app.put(
            '/course/:id',
            {
                schema: {
                    tags: ['Course'],
                    description: 'Update courses',
                    body: uptadeCourseSchemaResponse,
                    params: z.object({
                        id: z.string(),
                    }),
                    response: {
                        200: {
                            description: 'Successful response',
                            type: 'object',
                            properties: getCourseSchemaResponse,
                        },
                    },
                },
                // preHandler: ensureAuthenticated,
            },
            this.updateCourseController.handle
        );
        this.app.delete(
            '/course/:id',
            {
                schema: {
                    tags: ['Course'],
                    description: 'Deleted courses',
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
            this.deleteCourseController.handle
        );
    }
}
