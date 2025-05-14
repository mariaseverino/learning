import z from 'zod';

export const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
});

export const createUserResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
    // message: z.string(),
    // token: z.string(),
    // expiresAt: z.date(),
});

export const authenticateUserResponse = z.object({
    // id: z.string(),
    // name: z.string(),
    // email: z.string(),
    // role: z.string(),
    token: z.string(),
    refreshToken: z.object({
        id: z.string(),
        expiresIn: z.number(),
        userId: z.string(),
    }),
});

export const authenticateUserInput = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const RequestTokenRefreshOutput = z.object({
    token: z.string(),
    refreshToken: z
        .object({
            id: z.string(),
            expiresIn: z.number(),
            userId: z.string(),
        })
        .optional(),
});

export const RequestTokenRefreshInput = z.object({
    refreshToken: z.string(),
});

export const RequestHeaders = z.object({
    authorization: z.string(),
});

export type HeadersInput = z.infer<typeof RequestHeaders>;

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type AuthenticateUserInput = z.infer<typeof authenticateUserInput>;
export type RefreshTokenInput = z.infer<typeof RequestTokenRefreshInput>;
