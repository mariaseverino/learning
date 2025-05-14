import prisma from '../lib/prisma';
import { EmailService } from '../utils/email.service';
import { AuthenticateUserInput } from './types';
import {
    generateRefreshToken,
    generateToken,
    verifyPassword,
} from './providers';
import { AuthServices } from './AuthServices';

export class AuthenticateUserUseCase {
    // private readonly emailService: EmailService;
    private readonly authService: AuthServices;

    constructor() {
        // this.emailService = new EmailService();
        this.authService = new AuthServices();
    }

    async exexute({ email, password }: AuthenticateUserInput) {
        const userExists = await this.authService.findByEmail(email);

        if (!userExists) {
            throw new Error('Incorrect credentials');
        }

        const passwordMatch = await verifyPassword(
            password,
            userExists.password
        );

        if (!passwordMatch) {
            throw new Error('Incorrect credentials');
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
