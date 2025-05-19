import jsonwebtoken from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import dayjs from 'dayjs';
import prisma from '../lib/prisma';

export const generateToken = (userId: string) => {
    return jsonwebtoken.sign({}, process.env.JWT_SECRET!, {
        expiresIn: '15min',
        subject: userId,
    });
};

export const verifyToken = (authToken: string) => {
    const [, token] = authToken.split(' ');
    return jsonwebtoken.verify(token, process.env.JWT_SECRET!);
};

export const verifyIsUserHasAuthorization = async (authToken: string) => {
    const [, token] = authToken.split(' ');

    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === 'object') {
        const user = await prisma.user.findUnique({
            where: { id: decoded.sub },
        });
        return user?.role === 'admin';
    }
    return false;
};

export const passwordHashed = async (password: string) => {
    return await bcryptjs.hash(password, 10);
};

export const verifyPassword = async (
    password: string,
    passwordHash: string
) => {
    return await bcryptjs.compare(password, passwordHash);
};

export const generateRefreshToken = async (userId: string) => {
    const expiresIn = dayjs().add(15, 'seconds').unix();
    return await prisma.refreshToken.create({
        data: { userId, expiresIn },
    });
};
