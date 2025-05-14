// import { FastifyReply, FastifyRequest } from 'fastify';
// import z from 'zod';
// import {
//     authenticateUserInput,
//     createUserSchema,
//     RequestTokenRefreshInput,
// } from '../routes';
// import { RegisterUserUseCase } from './RegisterUserUseCase';
// import { SiginUseCase } from './AuthenticateUserUseCase';
// import { RefreshTokenUseCase } from './RefreshTokenUseCase';

// export type CreateUserInput = z.infer<typeof createUserSchema>;
// export type AuthenticateUserInput = z.infer<typeof authenticateUserInput>;
// export type RefreshTokenInput = z.infer<typeof RequestTokenRefreshInput>;

// export class AuthController {
//     async registerUser(
//         request: FastifyRequest<{ Body: CreateUserInput }>,
//         reply: FastifyReply
//     ) {
//         const data = request.body;

//         const useCase = new RegisterUserUseCase();

//         const response = await useCase.execute(data);

//         // console.log({ response: response });

//         return reply.status(201).send(response);
//     }

//     async login(
//         request: FastifyRequest<{ Body: AuthenticateUserInput }>,
//         reply: FastifyReply
//     ) {
//         const data = request.body;

//         const useCase = new SiginUseCase();
//         const response = await useCase.exexute(data);

//         // console.log({ response: response });

//         return reply.status(200).send(response);
//     }

//     async handle(
//         request: FastifyRequest<{ Body: RefreshTokenInput }>,
//         reply: FastifyReply
//     ) {
//         const { refreshToken } = request.body;

//         const useCase = new RefreshTokenUseCase();

//         const token = await useCase.execute(refreshToken);
//         console.log({ chegou: token });

//         return reply.status(200).send(token);
//     }
// }
