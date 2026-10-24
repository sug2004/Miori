import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProfileService } from './profile.service.js';

const baseUser = {
  id: 'user-1',
  email: 'test@example.com',
  passwordHash: 'hash',
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
  profile: { displayName: 'Miori Fan', avatarUrl: null, bio: null },
};

function mockPrisma() {
  return {
    user: {
      findUnique: vi.fn(),
    },
    userProfile: {
      upsert: vi.fn(),
    },
    wardrobeItem: {
      count: vi.fn(),
    },
    outfit: {
      count: vi.fn(),
    },
    stylePreferences: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
    },
  };
}

describe('ProfileService', () => {
  let service: ProfileService;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(async () => {
    prisma = mockPrisma();
    const app: TestingModule = await Test.createTestingModule({
      providers: [ProfileService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = app.get<ProfileService>(ProfileService);
  });

  describe('overview', () => {
    it('returns the public user with wardrobe/outfit counts and style preferences', async () => {
      prisma.user.findUnique.mockResolvedValue(baseUser);
      prisma.wardrobeItem.count.mockResolvedValue(24);
      prisma.outfit.count.mockResolvedValue(12);
      prisma.stylePreferences.findUnique.mockResolvedValue({
        styleGoals: ['Minimal'],
        styleTags: ['Neutral', 'Classic'],
        colorPalette: null,
        preferredCategories: null,
        budgetMin: 50,
        budgetMax: 200,
      });

      const result = await service.overview('user-1');

      expect(result.user.displayName).toBe('Miori Fan');
      expect(result.wardrobeItemCount).toBe(24);
      expect(result.savedLooksCount).toBe(12);
      expect(result.stylePreferences?.styleTags).toEqual(['Neutral', 'Classic']);
      expect(result.stylePreferences?.budgetMax).toBe(200);
    });

    it('returns null style preferences when none exist', async () => {
      prisma.user.findUnique.mockResolvedValue(baseUser);
      prisma.wardrobeItem.count.mockResolvedValue(0);
      prisma.outfit.count.mockResolvedValue(0);
      prisma.stylePreferences.findUnique.mockResolvedValue(null);

      const result = await service.overview('user-1');

      expect(result.stylePreferences).toBeNull();
    });

    it('throws NotFoundException when the user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.overview('missing')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('updateProfile', () => {
    it('upserts the profile and returns the updated user', async () => {
      prisma.userProfile.upsert.mockResolvedValue({});
      prisma.user.findUnique.mockResolvedValue({
        ...baseUser,
        profile: { displayName: 'New Name' },
      });

      const result = await service.updateProfile('user-1', {
        displayName: 'New Name',
      });

      expect(prisma.userProfile.upsert).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        create: { userId: 'user-1', displayName: 'New Name' },
        update: { displayName: 'New Name' },
      });
      expect(result.user.displayName).toBe('New Name');
    });
  });

  describe('style preferences', () => {
    it('returns null when no preferences are stored', async () => {
      prisma.stylePreferences.findUnique.mockResolvedValue(null);

      const result = await service.getStylePreferences('user-1');

      expect(result.stylePreferences).toBeNull();
    });

    it('upserts and returns preferences', async () => {
      prisma.stylePreferences.upsert.mockResolvedValue({});
      prisma.stylePreferences.findUnique.mockResolvedValue({
        styleGoals: ['Casual'],
        styleTags: ['Street'],
        colorPalette: null,
        preferredCategories: null,
        budgetMin: null,
        budgetMax: null,
      });

      const result = await service.upsertStylePreferences('user-1', {
        styleTags: ['Street'],
      });

      expect(prisma.stylePreferences.upsert).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        create: { userId: 'user-1', styleTags: ['Street'] },
        update: { styleTags: ['Street'] },
      });
      expect(result.stylePreferences?.styleGoals).toEqual(['Casual']);
      expect(result.stylePreferences?.styleTags).toEqual(['Street']);
    });
  });
});