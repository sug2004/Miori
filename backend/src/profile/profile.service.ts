import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, type User } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { StylePreferencesDto } from './dto/style-preferences.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';

function toJson(value: unknown): Prisma.InputJsonValue | undefined {
  return value as Prisma.InputJsonValue;
}

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async overview(userId: string) {
    const [user, wardrobeItemCount, savedLooksCount, stylePreferences] =
      await Promise.all([
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

  async updateProfile(userId: string, dto: UpdateProfileDto) {
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

  async updateAvatar(userId: string, avatarUrl: string) {
    await this.prisma.userProfile.upsert({
      where: { userId },
      create: { userId, avatarUrl },
      update: { avatarUrl },
    });
    return this.findPublicUser(userId);
  }

  async getStylePreferences(userId: string) {
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

  async upsertStylePreferences(userId: string, dto: StylePreferencesDto) {
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

  private async findPublicUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { user: this.toPublic(user) };
  }

  private toPublic(
    user: User & {
      profile?: {
        displayName: string | null;
        avatarUrl: string | null;
        bio: string | null;
      } | null;
    },
  ) {
    return {
      id: user.id,
      email: user.email,
      displayName: user.profile?.displayName ?? null,
      avatarUrl: user.profile?.avatarUrl ?? null,
      bio: user.profile?.bio ?? null,
      createdAt: user.createdAt,
    };
  }
}