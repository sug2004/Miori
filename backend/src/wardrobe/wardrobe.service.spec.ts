import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from '../ai/ai.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UploadsService } from '../uploads/uploads.service.js';
import { WardrobeService } from './wardrobe.service.js';

const baseItem = {
  id: 'item-1',
  userId: 'user-1',
  imageUrl: 'https://example.com/shirt.png',
  category: 'top',
  subcategory: 'shirt',
  color: 'white',
  secondaryColors: ['navy'],
  pattern: null,
  material: 'cotton',
  fit: null,
  styleTags: ['minimal'],
  formality: null,
  season: null,
  brand: null,
  purchaseDate: null,
  price: null,
  favorite: false,
  wearCount: 0,
  notes: null,
  status: 'SAVED',
  source: 'ai',
  createdAt: new Date('2026-10-01T00:00:00.000Z'),
  updatedAt: new Date('2026-10-01T00:00:00.000Z'),
};

function mockPrisma() {
  return {
    wardrobeItem: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      deleteMany: vi.fn(),
    },
  };
}

describe('WardrobeService', () => {
  let service: WardrobeService;
  let prisma: ReturnType<typeof mockPrisma>;
  let uploads: { uploadImage: ReturnType<typeof vi.fn> };
  let ai: { extractWardrobeDraft: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    prisma = mockPrisma();
    uploads = { uploadImage: vi.fn() };
    ai = { extractWardrobeDraft: vi.fn() };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        WardrobeService,
        { provide: PrismaService, useValue: prisma },
        { provide: UploadsService, useValue: uploads },
        { provide: AiService, useValue: ai },
      ],
    }).compile();

    service = app.get<WardrobeService>(WardrobeService);
  });

  it('lists items scoped to the user and maps JSON columns', async () => {
    prisma.wardrobeItem.findMany.mockResolvedValue([baseItem]);

    const result = await service.list('user-1', {
      search: 'shirt',
      favorite: true,
      sort: 'worn',
    });

    expect(prisma.wardrobeItem.findMany).toHaveBeenCalledWith({
      where: {
        userId: 'user-1',
        favorite: true,
        OR: [
          { category: { contains: 'shirt', mode: 'insensitive' } },
          { subcategory: { contains: 'shirt', mode: 'insensitive' } },
          { color: { contains: 'shirt', mode: 'insensitive' } },
          { brand: { contains: 'shirt', mode: 'insensitive' } },
          { notes: { contains: 'shirt', mode: 'insensitive' } },
        ],
      },
      orderBy: [{ wearCount: 'desc' }, { createdAt: 'desc' }],
    });
    expect(result.items[0].secondaryColors).toEqual(['navy']);
    expect(result.items[0].styleTags).toEqual(['minimal']);
    expect(result.items[0].createdAt).toBe('2026-10-01T00:00:00.000Z');
  });

  it('creates a saved item by default', async () => {
    prisma.wardrobeItem.create.mockResolvedValue(baseItem);

    const result = await service.create('user-1', {
      imageUrl: 'https://example.com/shirt.png',
      category: 'top',
      color: 'white',
      styleTags: ['minimal'],
    });

    expect(prisma.wardrobeItem.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        userId: 'user-1',
        category: 'top',
        status: 'SAVED',
        source: 'manual',
        styleTags: ['minimal'],
      }),
    });
    expect(result.item.id).toBe('item-1');
  });

  it('rejects updates for items owned by another user', async () => {
    prisma.wardrobeItem.findFirst.mockResolvedValue(null);

    await expect(
      service.update('user-2', 'item-1', { color: 'black' }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('throws when deleting a missing item', async () => {
    prisma.wardrobeItem.deleteMany.mockResolvedValue({ count: 0 });

    await expect(service.remove('user-1', 'missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('increments wear count', async () => {
    prisma.wardrobeItem.findFirst.mockResolvedValue(baseItem);
    prisma.wardrobeItem.update.mockResolvedValue({ ...baseItem, wearCount: 1 });

    const result = await service.markWorn('user-1', 'item-1');

    expect(prisma.wardrobeItem.update).toHaveBeenCalledWith({
      where: { id: 'item-1' },
      data: { wearCount: { increment: 1 } },
    });
    expect(result.item.wearCount).toBe(1);
  });

  it('uploads an image and returns an AI draft', async () => {
    uploads.uploadImage.mockResolvedValue({
      url: 'https://cdn.example.com/shirt.png',
      key: 'key',
      name: 'shirt.png',
      size: 100,
    });
    ai.extractWardrobeDraft.mockResolvedValue({
      category: 'top',
      subcategory: 'shirt',
      color: 'white',
      secondaryColors: [],
      pattern: 'solid',
      material: 'cotton',
      fit: 'regular',
      styleTags: ['minimal'],
      formality: 'casual',
      season: 'all-season',
      source: 'ai',
    });

    const result = await service.createDraft('user-1', {
      buffer: Buffer.from('x'),
      size: 1,
      mimetype: 'image/png',
    });

    expect(result.imageUrl).toBe('https://cdn.example.com/shirt.png');
    expect(result.draft.source).toBe('ai');
  });
});
