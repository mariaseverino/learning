import { CreateUserInput } from './types';
import { passwordHashed } from './providers';
import { AuthServices } from './AuthServices';

export class RegisterUserUseCase {
    async execute({ name, email, password }: CreateUserInput) {
        const authService = new AuthServices();
        const userAlreadyExists = await authService.findByEmail(email);

        if (userAlreadyExists) {
            throw new Error('User already exists');
        }

        const passwordHash = await passwordHashed(password);

        const user = await authService.save({
            name,
            email,
            password: passwordHash,
        });

        // const emailService = new EmailService();

        // await emailService.sendConfirmationEmail(email, token);

        return {
            id: user.id,
            name,
            email,
            role: user.role,
        };
    }
}
