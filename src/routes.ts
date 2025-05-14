import { AuthRoutes } from './routes/auth';
import { CourseRoutes } from './routes/course';
import { LessonRoutes } from './routes/LessonRoutes';
import { FastifyTypeInstance } from './types';

// export async function routes(app: FastifyTypeInstance) {
//     const authenticateUserController = new AuthenticateUserController();
//     const registerUserController = new RegisterUserController();
//     const refreshTokenController = new RefreshTokenController();

//     app.get(
//         '/users',
//         {
//             schema: {
//                 tags: ['users'],
//                 description: 'list users',

//                 response: {
//                     200: z.array(
//                         z.object({
//                             id: z.string(),
//                             name: z.string(),
//                             email: z.string(),
//                         })
//                     ),
//                 },
//             },
//         },
//         async () => {
//             return [];
//         }
//     );
//     app.post(
//         '/register',
//         {
//             schema: {
//                 tags: ['users'],
//                 description: 'Register user',
//                 body: createUserSchema,
//                 response: {
//                     // 201: z.null().describe('User created'),
//                     201: {
//                         description: 'Successful response',
//                         type: 'object',
//                         properties: createUserResponseSchema,
//                     },
//                 },
//             },
//         },
//         registerUserController.handle
//     );
//     app.post(
//         '/authenticate',
//         {
//             schema: {
//                 tags: ['auth'],
//                 description: 'Authenticate user',
//                 body: authenticateUserInput,
//                 response: {
//                     200: {
//                         description: 'Successful response',
//                         type: 'object',
//                         properties: authenticateUserResponse,
//                     },
//                 },
//             },
//         },
//         authenticateUserController.handle
//     );

//     app.get(
//         '/teste',
//         {
//             schema: {
//                 tags: ['teste'],
//                 description: 'list users',

//                 response: {
//                     200: z.array(
//                         z.object({
//                             message: z.string(),
//                         })
//                     ),
//                     401: z.object({
//                         message: z.string(),
//                     }),
//                 },
//             },
//             preHandler: ensureAuthenticated,
//         },

//         async (request, reply) => {
//             return reply.status(201).send({
//                 message: 'ok',
//             });
//         }
//     );
//     app.post(
//         '/refresh_token',
//         {
//             schema: {
//                 tags: ['auth'],
//                 description: 'Refresh user token',
//                 body: RequestTokenRefreshInput,
//                 response: {
//                     200: {
//                         description: 'Successful response',
//                         type: 'object',
//                         properties: RequestTokenRefreshOutput,
//                     },
//                 },
//             },
//             // preHandler: ensureAthenticated,
//         },

//         refreshTokenController.handle
//     );
// }

export async function routes(app: FastifyTypeInstance) {
    const authRoutes = new AuthRoutes(app);
    const courseRoutes = new CourseRoutes(app);
    const lessonRoutes = new LessonRoutes(app);
    await authRoutes.registerRoutes();
    await courseRoutes.registerRoutes();
    await lessonRoutes.registerRoutes();
}
