import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
import { SignupDto } from './dto/signup.dto.js';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    signup(dto: SignupDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            displayName: string | null;
            avatarUrl: string | null;
            bio: string | null;
            createdAt: Date;
        };
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            displayName: string | null;
            avatarUrl: string | null;
            bio: string | null;
            createdAt: Date;
        };
    }>;
    me(userId: string): Promise<{
        user: {
            id: string;
            email: string;
            displayName: string | null;
            avatarUrl: string | null;
            bio: string | null;
            createdAt: Date;
        };
    }>;
    private sign;
    private toPublic;
}
