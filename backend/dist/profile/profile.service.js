var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
function toJson(value) {
    return value;
}
let ProfileService = class ProfileService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async overview(userId) {
        const [user, wardrobeItemCount, savedLooksCount, stylePreferences] = await Promise.all([
            this.prisma.user.findUnique({
                where: { id: userId },
                include: { profile: true },
            }),
            this.prisma.wardrobeItem.count({
                where: { userId, status: 'SAVED' },
            }),
            this.prisma.outfit.count({ where: { userId } }),
            this.prisma.stylePreferences.findUnique({ where: { userId } }),
        ]);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return {
            user: this.toPublic(user),
            wardrobeItemCount,
            savedLooksCount,
            stylePreferences: stylePreferences
                ? {
                    styleGoals: stylePreferences.styleGoals,
                    styleTags: stylePreferences.styleTags,
                    colorPalette: stylePreferences.colorPalette,
                    preferredCategories: stylePreferences.preferredCategories,
                    budgetMin: stylePreferences.budgetMin,
                    budgetMax: stylePreferences.budgetMax,
                }
                : null,
        };
    }
    async updateProfile(userId, dto) {
        const data = {
            displayName: dto.displayName,
            avatarUrl: dto.avatarUrl,
            bio: dto.bio,
        };
        await this.prisma.userProfile.upsert({
            where: { userId },
            create: { userId, ...data },
            update: data,
        });
        return this.findPublicUser(userId);
    }
    async updateAvatar(userId, avatarUrl) {
        await this.prisma.userProfile.upsert({
            where: { userId },
            create: { userId, avatarUrl },
            update: { avatarUrl },
        });
        return this.findPublicUser(userId);
    }
    async getStylePreferences(userId) {
        const prefs = await this.prisma.stylePreferences.findUnique({
            where: { userId },
        });
        if (!prefs) {
            return { stylePreferences: null };
        }
        return {
            stylePreferences: {
                styleGoals: prefs.styleGoals,
                styleTags: prefs.styleTags,
                colorPalette: prefs.colorPalette,
                preferredCategories: prefs.preferredCategories,
                budgetMin: prefs.budgetMin,
                budgetMax: prefs.budgetMax,
            },
        };
    }
    async upsertStylePreferences(userId, dto) {
        const data = {
            styleGoals: toJson(dto.styleGoals),
            styleTags: toJson(dto.styleTags),
            colorPalette: toJson(dto.colorPalette),
            preferredCategories: toJson(dto.preferredCategories),
            budgetMin: dto.budgetMin,
            budgetMax: dto.budgetMax,
        };
        await this.prisma.stylePreferences.upsert({
            where: { userId },
            create: { userId, ...data },
            update: data,
        });
        return this.getStylePreferences(userId);
    }
    async findPublicUser(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { profile: true },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return { user: this.toPublic(user) };
    }
    toPublic(user) {
        return {
            id: user.id,
            email: user.email,
            displayName: user.profile?.displayName ?? null,
            avatarUrl: user.profile?.avatarUrl ?? null,
            bio: user.profile?.bio ?? null,
            createdAt: user.createdAt,
        };
    }
};
ProfileService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ProfileService);
export { ProfileService };
//# sourceMappingURL=profile.service.js.map