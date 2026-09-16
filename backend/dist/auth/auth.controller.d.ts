import type { User } from '../generated/prisma/client.js';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { SignupDto } from './dto/signup.dto.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(dto: SignupDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            displayName: string | null;
            createdAt: Date;
        };
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            displayName: string | null;
            createdAt: Date;
        };
    }>;
    me(user: User): Promise<{
        user: {
            id: string;
            email: string;
            displayName: string | null;
            createdAt: Date;
        };
    }>;
}
