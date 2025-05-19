import prisma from '../lib/prisma';
import dayjs from 'dayjs';
import { generateRefreshToken, generateToken } from './providers';
import { AppError } from '../errors/AppError';

export class RefreshTokenUseCase {
    async execute(refresh_token: string) {
        const refreshToken = await prisma.refreshToken.findFirst({
            where: { id: refresh_token },
        });

        if (!refreshToken) {
            throw new AppError('Invalid refresh token.', 401);
        }

        const refreshTokenExpired = dayjs().isAfter(
            dayjs.unix(refreshToken.expiresIn)
        );

        const token = generateToken(refreshToken.userId);

        if (refreshTokenExpired) {
            await prisma.refreshToken.deleteMany({
                where: {
                    userId: refreshToken.userId,
                },
            });

            const newRefreshToken = generateRefreshToken(refreshToken.userId);

            return {
                token: token,
                refreshToken: newRefreshToken,
            };
        }

        return { token: token };
    }
}
