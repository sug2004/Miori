import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, type WardrobeItem } from '../generated/prisma/client.js';
import { AiService, type WardrobeDraft } from '../ai/ai.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UploadsService, type ImageFile } from '../uploads/uploads.service.js';
import { CreateWardrobeItemDto } from './dto/create-wardrobe-item.dto.js';
import { UpdateWardrobeItemDto } from './dto/update-wardrobe-item.dto.js';

export interface WardrobeFilters {
  category?: string;
  favorite?: boolean;
  status?: 'DRAFT' | 'SAVED';
  search?: string;
  sort?: string;
}

function asStringArray(value: Prisma.JsonValue | null): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is string => typeof entry === 'string');
}

function nullable(value: string | undefined): string | null | undefined {
  if (value === undefined) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

@Injectable()
export class WardrobeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploads: UploadsService,
    private readonly ai: AiService,
  ) {}

  async list(userId: string, filters: WardrobeFilters) {
    const where: Prisma.WardrobeItemWhereInput = { userId };

    if (filters.category) {
      where.category = filters.category;
    }
    if (filters.favorite !== undefined) {
      where.favorite = filters.favorite;
    }
    if (filters.status) {
      where.status = filters.status;
    }
    if (filters.search?.trim()) {
      const search = filters.search.trim();
      where.OR = [
        { category: { contains: search, mode: 'insensitive' } },
        { subcategory: { contains: search, mode: 'insensitive' } },
        { color: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { notes: { contains: search, mode: 'insensitive' } },
      ];
    }

    const items = await this.prisma.wardrobeItem.findMany({
      where,
      orderBy: this.orderBy(filters.sort),
    });

    return { items: items.map((item) => this.toPublic(item)) };
  }

  async get(userId: string, id: string) {
    return { item: this.toPublic(await this.findOwned(userId, id)) };
  }

  async create(userId: string, dto: CreateWardrobeItemDto) {
    const category = dto.category.trim();
    if (!category) {
      throw new BadRequestException('Category is required');
    }

    const data: Prisma.WardrobeItemUncheckedCreateInput = {
      userId,
      imageUrl: dto.imageUrl.trim(),
      category,
      subcategory: nullable(dto.subcategory),
      color: nullable(dto.color),
      secondaryColors: dto.secondaryColors as Prisma.InputJsonValue | undefined,
      pattern: nullable(dto.pattern),
      material: nullable(dto.material),
      fit: nullable(dto.fit),
      styleTags: dto.styleTags as Prisma.InputJsonValue | undefined,
      formality: nullable(dto.formality),
      season: nullable(dto.season),
      brand: nullable(dto.brand),
      purchaseDate: dto.purchaseDate ? new Date(dto.purchaseDate) : undefined,
      price: dto.price,
      favorite: dto.favorite ?? false,
      notes: nullable(dto.notes),
      status: dto.status ?? 'SAVED',
      source: dto.source ?? 'manual',
    };

    const item = await this.prisma.wardrobeItem.create({ data });
    return { item: this.toPublic(item) };
  }

  async update(userId: string, id: string, dto: UpdateWardrobeItemDto) {
    await this.findOwned(userId, id);

    const data: Prisma.WardrobeItemUpdateInput = {};

    if (dto.imageUrl !== undefined) data.imageUrl = dto.imageUrl.trim();
    if (dto.category !== undefined) {
      const category = dto.category.trim();
      if (!category) {
        throw new BadRequestException('Category cannot be empty');
      }
      data.category = category;
    }
    if (dto.subcategory !== undefined) data.subcategory = nullable(dto.subcategory);
    if (dto.color !== undefined) data.color = nullable(dto.color);
    if (dto.secondaryColors !== undefined) {
      data.secondaryColors = dto.secondaryColors as Prisma.InputJsonValue;
    }
    if (dto.pattern !== undefined) data.pattern = nullable(dto.pattern);
    if (dto.material !== undefined) data.material = nullable(dto.material);
    if (dto.fit !== undefined) data.fit = nullable(dto.fit);
    if (dto.styleTags !== undefined) data.styleTags = dto.styleTags as Prisma.InputJsonValue;
    if (dto.formality !== undefined) data.formality = nullable(dto.formality);
    if (dto.season !== undefined) data.season = nullable(dto.season);
    if (dto.brand !== undefined) data.brand = nullable(dto.brand);
    if (dto.purchaseDate !== undefined) data.purchaseDate = new Date(dto.purchaseDate);
    if (dto.price !== undefined) data.price = dto.price;
    if (dto.favorite !== undefined) data.favorite = dto.favorite;
    if (dto.notes !== undefined) data.notes = nullable(dto.notes);
    if (dto.status !== undefined) data.status = dto.status;

    const item = await this.prisma.wardrobeItem.update({ where: { id }, data });
    return { item: this.toPublic(item) };
  }

  async remove(userId: string, id: string) {
    const result = await this.prisma.wardrobeItem.deleteMany({
      where: { id, userId },
    });
    if (result.count === 0) {
      throw new NotFoundException('Wardrobe item not found');
    }
    return { success: true };
  }

  async markWorn(userId: string, id: string) {
    await this.findOwned(userId, id);
    const item = await this.prisma.wardrobeItem.update({
      where: { id },
      data: { wearCount: { increment: 1 } },
    });
    return { item: this.toPublic(item) };
  }

  async createDraft(userId: string, file: ImageFile) {
    void userId;
    const image = await this.uploads.uploadImage(file);
    const draft: WardrobeDraft = await this.ai.extractWardrobeDraft(image.url);
    return { imageUrl: image.url, draft };
  }

  private orderBy(sort?: string): Prisma.WardrobeItemOrderByWithRelationInput[] {
    switch (sort) {
      case 'oldest':
        return [{ createdAt: 'asc' }];
      case 'worn':
        return [{ wearCount: 'desc' }, { createdAt: 'desc' }];
      case 'favorite':
        return [{ favorite: 'desc' }, { createdAt: 'desc' }];
      case 'recent':
      default:
        return [{ createdAt: 'desc' }];
    }
  }

  private async findOwned(userId: string, id: string): Promise<WardrobeItem> {
    const item = await this.prisma.wardrobeItem.findFirst({
      where: { id, userId },
    });
    if (!item) {
      throw new NotFoundException('Wardrobe item not found');
    }
    return item;
  }

  private toPublic(item: WardrobeItem) {
    return {
      id: item.id,
      userId: item.userId,
      imageUrl: item.imageUrl,
      category: item.category,
      subcategory: item.subcategory,
      color: item.color,
      secondaryColors: asStringArray(item.secondaryColors),
      pattern: item.pattern,
      material: item.material,
      fit: item.fit,
      styleTags: asStringArray(item.styleTags),
      formality: item.formality,
      season: item.season,
      brand: item.brand,
      purchaseDate: item.purchaseDate?.toISOString() ?? null,
      price: item.price === null ? null : Number(item.price),
      favorite: item.favorite,
      wearCount: item.wearCount,
      notes: item.notes,
      status: item.status,
      source: item.source,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    };
  }
}
