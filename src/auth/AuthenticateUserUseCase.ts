import prisma from '../lib/prisma';
import { EmailService } from '../utils/email.service';
import { AuthenticateUserInput } from './types';
import {
    generateRefreshToken,
    generateToken,
    verifyPassword,
} from './providers';
import { AuthRepository } from './AuthRepository';
import { AppError } from '../errors/AppError';

export class AuthenticateUserUseCase {
    // private readonly emailService: EmailService;
    private readonly authService: AuthRepository;

    constructor() {
        // this.emailService = new EmailService();
        this.authService = new AuthRepository();
    }

    async exexute({ email, password }: AuthenticateUserInput) {
        const userExists = await this.authService.findByEmail(email);

        if (!userExists) {
            throw new AppError('Incorrect credentials', 401);
        }

        const passwordMatch = await verifyPassword(
            password,
            userExists.password
        );

        if (!passwordMatch) {
            throw new AppError('Incorrect credentials', 401);
        }

        const token = generateToken(userExists.id);

        await prisma.refreshToken.deleteMany({
            where: {
                userId: userExists.id,
            },
        });

        const refreshToken = await generateRefreshToken(userExists.id);

        return { token, refreshToken };
    }
}
