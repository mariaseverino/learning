import { AuthenticateUserController } from '../auth/AuthenticateUserController';
import { RefreshTokenController } from '../auth/RefreshTokenController';
import { RegisterUserController } from '../auth/RegisterUserController';
import {
    authenticateUserInput,
    authenticateUserResponse,
    createUserResponseSchema,
    createUserSchema,
    RequestHeaders,
    RequestTokenRefreshInput,
    RequestTokenRefreshOutput,
} from '../auth/types';
import { ensureAuthenticated } from '../middleware/ensure-authenticated';
import { FastifyTypeInstance } from '../types';

export class AuthRoutes {
    private authenticateUserController: AuthenticateUserController;
    private registerUserController: RegisterUserController;
    private refreshTokenController: RefreshTokenController;

    constructor(private readonly app: FastifyTypeInstance) {
        this.authenticateUserController = new AuthenticateUserController();
        this.registerUserController = new RegisterUserController();
        this.refreshTokenController = new RefreshTokenController();
    }
    async registerRoutes() {
        this.app.post(
            '/register',
            {
                schema: {
                    tags: ['users'],
                    description: 'Register user',
                    body: createUserSchema,
                    response: {
                        // 201: z.null().describe('User created'),
                        201: {
                            description: 'Successful response',
                            type: 'object',
                            properties: createUserResponseSchema,
                        },
                    },
                },
            },
            this.registerUserController.handle
        );
        this.app.post(
            '/authenticate',
            {
                schema: {
                    tags: ['auth'],
                    description: 'Authenticate user',
                    body: authenticateUserInput,
                    response: {
                        200: {
                            description: 'Successful response',
                            type: 'object',
                            properties: authenticateUserResponse,
                        },
                    },
                },
            },
            this.authenticateUserController.handle
        );
        this.app.post(
            '/refresh_token',
            {
                schema: {
                    tags: ['auth'],
                    description: 'Refresh user token',
                    body: RequestTokenRefreshInput,
                    headers: RequestHeaders,
                    response: {
                        200: {
                            description: 'Successful response',
                            type: 'object',
                            properties: RequestTokenRefreshOutput,
                        },
                    },
                },
                preHandler: ensureAuthenticated,
            },

            this.refreshTokenController.handle
        );
    }
}
