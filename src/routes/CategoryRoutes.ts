import z from 'zod';
import { CreateCategoryController } from '../category/CreateCategoryController';
import { DeleteCategoryController } from '../category/DeleteCategoryController';
import { GetCategoriesController } from '../category/GetCategoriesController';
import {
    createCategorySchema,
    createCategorySchemaResponse,
    getCategoriesSchema,
} from '../category/types';
import { ensureAuthenticated } from '../middleware/ensure-authenticated';
import { FastifyTypeInstance } from '../types';
import { ensureHasAuthorization } from '../middleware/ensure-has-authorization';

export class CategoryRoutes {
    private createCategoryController: CreateCategoryController;
    private getCategoriesController: GetCategoriesController;
    private deleteCategoryController: DeleteCategoryController;

    constructor(private readonly app: FastifyTypeInstance) {
        this.createCategoryController = new CreateCategoryController();
        this.getCategoriesController = new GetCategoriesController();
        this.deleteCategoryController = new DeleteCategoryController();
    }

    async registerRoutes() {
        this.app.post(
            '/category/new',
            {
                schema: {
                    tags: ['Category'],
                    description: 'Create new category',
                    headers: z.object({
                        authorization: z.string(),
                    }),
                    body: createCategorySchema,
                    response: {
                        201: {
                            description: 'Successful response',
                            type: 'object',
                            properties: createCategorySchemaResponse,
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
            this.createCategoryController.handle
        );
        this.app.get(
            '/categories',
            {
                schema: {
                    tags: ['Category'],
                    description: 'get categories',
                    headers: z.object({
                        authorization: z.string(),
                    }),
                    response: {
                        201: {
                            description: 'Successful response',
                            type: 'object',
                            properties: getCategoriesSchema,
                        },
                    },
                },
                preHandler: [ensureAuthenticated, ensureHasAuthorization],
            },
            this.getCategoriesController.handle
        );

        this.app.delete(
            '/category/:id',
            {
                schema: {
                    tags: ['Category'],
                    description: 'Deleted category',
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
            this.deleteCategoryController.handle
        );
    }
}
