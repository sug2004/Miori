import type { User } from '../generated/prisma/client.js';
import { UploadsService } from '../uploads/uploads.service.js';
import { StylePreferencesDto } from './dto/style-preferences.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { ProfileService } from './profile.service.js';
export declare class ProfileController {
    private readonly profileService;
    private readonly uploadsService;
    constructor(profileService: ProfileService, uploadsService: UploadsService);
    overview(user: User): Promise<{
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
    update(user: User, dto: UpdateProfileDto): Promise<{
        user: {
            id: string;
            email: string;
            displayName: string | null;
            avatarUrl: string | null;
            bio: string | null;
            createdAt: Date;
        };
    }>;
    uploadAvatar(user: User, file?: {
        buffer: Buffer;
        originalname?: string;
        mimetype?: string;
        size: number;
    }): Promise<{
        user: {
            id: string;
            email: string;
            displayName: string | null;
            avatarUrl: string | null;
            bio: string | null;
            createdAt: Date;
        };
    }>;
    stylePreferences(user: User): Promise<{
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
    setStylePreferences(user: User, dto: StylePreferencesDto): Promise<{
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
}
