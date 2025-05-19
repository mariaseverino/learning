import { CreateUserInput } from './types';
import { passwordHashed } from './providers';
import { AuthRepository } from './AuthRepository';
import { AppError } from '../errors/AppError';

export class RegisterUserUseCase {
    async execute({ name, email, password }: CreateUserInput) {
        const authRepository = new AuthRepository();
        const userAlreadyExists = await authRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError('User already exists.', 409);
        }

        const passwordHash = await passwordHashed(password);

        const user = await authRepository.save({
            name,
            email,
            password: passwordHash,
        });

        // const emailRepository = new EmailRepository();

        // await emailRepository.sendConfirmationEmail(email, token);

        return {
            id: user.id,
            name,
            email,
            role: user.role,
        };
    }
}
