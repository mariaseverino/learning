import z from 'zod';
import { CreateInstructorController } from '../instructor/CreateInstructorController';
import { DeleteInstructorController } from '../instructor/DeleteInstructorController';
import { GetInstructorsController } from '../instructor/GetInstructorsController';
import { UpdateInstructorController } from '../instructor/UpdateInstructorController';
import { ensureAuthenticated } from '../middleware/ensure-authenticated';
import { FastifyTypeInstance } from '../types';
import {
    createInstructorSchema,
    createInstructorSchemaResponse,
    getInstructorsSchema,
    updateInstructorSchema,
} from '../instructor/types';
import { ensureHasAuthorization } from '../middleware/ensure-has-authorization';

export class InstructorRoutes {
    private createInstructorController: CreateInstructorController;
    private getInstructorsController: GetInstructorsController;
    private updateInstructorController: UpdateInstructorController;
    private deleteInstructorController: DeleteInstructorController;

    constructor(private readonly app: FastifyTypeInstance) {
        this.createInstructorController = new CreateInstructorController();
        this.getInstructorsController = new GetInstructorsController();
        this.updateInstructorController = new UpdateInstructorController();
        this.deleteInstructorController = new DeleteInstructorController();
    }

    async registerRoutes() {
        this.app.post(
            '/instructor/new',
            {
                schema: {
                    tags: ['Instructor'],
                    description: 'Create new instructor',
                    headers: z.object({
                        authorization: z.string(),
                    }),
                    body: createInstructorSchema,
                    response: {
                        201: {
                            description: 'Successful response',
                            type: 'object',
                            properties: createInstructorSchemaResponse,
                        },
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
            this.createInstructorController.handle
        );
        this.app.get(
            '/instructors',
            {
                schema: {
                    tags: ['Instructor'],
                    description: 'get instructors',
                    headers: z.object({
                        authorization: z.string(),
                    }),
                    response: {
                        201: {
                            description: 'Successful response',
                            type: 'object',
                            properties: getInstructorsSchema,
                        },
                    },
                },
                preHandler: ensureAuthenticated,
            },
            this.getInstructorsController.handle
        );
        this.app.put(
            '/instructor/:id',
            {
                schema: {
                    tags: ['Instructor'],
                    description: 'Update instructors',
                    headers: z.object({
                        authorization: z.string(),
                    }),
                    body: updateInstructorSchema,
                    params: z.object({
                        id: z.string(),
                    }),
                    response: {
                        200: {
                            description: 'Successful response',
                            type: 'object',
                            properties: createInstructorSchemaResponse,
                        },
                        404: z.object({
                            message: z.string(),
                        }),
                    },
                },
                preHandler: [ensureAuthenticated, ensureHasAuthorization],
            },
            this.updateInstructorController.handle
        );
        this.app.delete(
            '/instructor/:id',
            {
                schema: {
                    tags: ['Instructor'],
                    description: 'Deleted instructor',
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
                    },
                },
                preHandler: [ensureAuthenticated, ensureHasAuthorization],
            },
            this.deleteInstructorController.handle
        );
    }
}
