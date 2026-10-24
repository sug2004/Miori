import { PrismaService } from '../prisma/prisma.service.js';
import { StylePreferencesDto } from './dto/style-preferences.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
export declare class ProfileService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    overview(userId: string): Promise<{
        user: {
            id: string;
            email: string;
            displayName: string | null;
            avatarUrl: string | null;
            bio: string | null;
            createdAt: Date;
        };
        wardrobeItemCount: number;
        savedLooksCount: number;
        stylePreferences: {
            styleGoals: import("@prisma/client/runtime/client").JsonValue;
            styleTags: import("@prisma/client/runtime/client").JsonValue;
            colorPalette: import("@prisma/client/runtime/client").JsonValue;
            preferredCategories: import("@prisma/client/runtime/client").JsonValue;
            budgetMin: number | null;
            budgetMax: number | null;
        } | null;
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
        user: {
            id: string;
            email: string;
            displayName: string | null;
            avatarUrl: string | null;
            bio: string | null;
            createdAt: Date;
        };
    }>;
    updateAvatar(userId: string, avatarUrl: string): Promise<{
        user: {
            id: string;
            email: string;
            displayName: string | null;
            avatarUrl: string | null;
            bio: string | null;
            createdAt: Date;
        };
    }>;
    getStylePreferences(userId: string): Promise<{
        stylePreferences: null;
    } | {
        stylePreferences: {
            styleGoals: import("@prisma/client/runtime/client").JsonValue;
            styleTags: import("@prisma/client/runtime/client").JsonValue;
            colorPalette: import("@prisma/client/runtime/client").JsonValue;
            preferredCategories: import("@prisma/client/runtime/client").JsonValue;
            budgetMin: number | null;
            budgetMax: number | null;
        };
    }>;
    upsertStylePreferences(userId: string, dto: StylePreferencesDto): Promise<{
        stylePreferences: null;
    } | {
        stylePreferences: {
            styleGoals: import("@prisma/client/runtime/client").JsonValue;
            styleTags: import("@prisma/client/runtime/client").JsonValue;
            colorPalette: import("@prisma/client/runtime/client").JsonValue;
            preferredCategories: import("@prisma/client/runtime/client").JsonValue;
            budgetMin: number | null;
            budgetMax: number | null;
        };
    }>;
    private findPublicUser;
    private toPublic;
}
