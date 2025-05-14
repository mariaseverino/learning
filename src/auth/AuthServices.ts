import prisma from '../lib/prisma';
import { CreateUserInput } from './types';

export class AuthServices {
    async findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email },
        });
    }

    async save(data: CreateUserInput) {
        return await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
        });
    }
}
