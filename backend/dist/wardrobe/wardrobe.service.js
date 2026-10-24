var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { AiService } from '../ai/ai.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UploadsService } from '../uploads/uploads.service.js';
function asStringArray(value) {
    if (!Array.isArray(value))
        return [];
    return value.filter((entry) => typeof entry === 'string');
}
function nullable(value) {
    if (value === undefined)
        return undefined;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}
let WardrobeService = class WardrobeService {
    prisma;
    uploads;
    ai;
    constructor(prisma, uploads, ai) {
        this.prisma = prisma;
        this.uploads = uploads;
        this.ai = ai;
    }
    async list(userId, filters) {
        const where = { userId };
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
    async get(userId, id) {
        return { item: this.toPublic(await this.findOwned(userId, id)) };
    }
    async create(userId, dto) {
        const category = dto.category.trim();
        if (!category) {
            throw new BadRequestException('Category is required');
        }
        const data = {
            userId,
            imageUrl: dto.imageUrl.trim(),
            category,
            subcategory: nullable(dto.subcategory),
            color: nullable(dto.color),
            secondaryColors: dto.secondaryColors,
            pattern: nullable(dto.pattern),
            material: nullable(dto.material),
            fit: nullable(dto.fit),
            styleTags: dto.styleTags,
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
    async update(userId, id, dto) {
        await this.findOwned(userId, id);
        const data = {};
        if (dto.imageUrl !== undefined)
            data.imageUrl = dto.imageUrl.trim();
        if (dto.category !== undefined) {
            const category = dto.category.trim();
            if (!category) {
                throw new BadRequestException('Category cannot be empty');
            }
            data.category = category;
        }
        if (dto.subcategory !== undefined)
            data.subcategory = nullable(dto.subcategory);
        if (dto.color !== undefined)
            data.color = nullable(dto.color);
        if (dto.secondaryColors !== undefined) {
            data.secondaryColors = dto.secondaryColors;
        }
        if (dto.pattern !== undefined)
            data.pattern = nullable(dto.pattern);
        if (dto.material !== undefined)
            data.material = nullable(dto.material);
        if (dto.fit !== undefined)
            data.fit = nullable(dto.fit);
        if (dto.styleTags !== undefined)
            data.styleTags = dto.styleTags;
        if (dto.formality !== undefined)
            data.formality = nullable(dto.formality);
        if (dto.season !== undefined)
            data.season = nullable(dto.season);
        if (dto.brand !== undefined)
            data.brand = nullable(dto.brand);
        if (dto.purchaseDate !== undefined)
            data.purchaseDate = new Date(dto.purchaseDate);
        if (dto.price !== undefined)
            data.price = dto.price;
        if (dto.favorite !== undefined)
            data.favorite = dto.favorite;
        if (dto.notes !== undefined)
            data.notes = nullable(dto.notes);
        if (dto.status !== undefined)
            data.status = dto.status;
        const item = await this.prisma.wardrobeItem.update({ where: { id }, data });
        return { item: this.toPublic(item) };
    }
    async remove(userId, id) {
        const result = await this.prisma.wardrobeItem.deleteMany({
            where: { id, userId },
        });
        if (result.count === 0) {
            throw new NotFoundException('Wardrobe item not found');
        }
        return { success: true };
    }
    async markWorn(userId, id) {
        await this.findOwned(userId, id);
        const item = await this.prisma.wardrobeItem.update({
            where: { id },
            data: { wearCount: { increment: 1 } },
        });
        return { item: this.toPublic(item) };
    }
    async createDraft(userId, file) {
        void userId;
        const image = await this.uploads.uploadImage(file);
        const draft = await this.ai.extractWardrobeDraft(image.url);
        return { imageUrl: image.url, draft };
    }
    orderBy(sort) {
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
    async findOwned(userId, id) {
        const item = await this.prisma.wardrobeItem.findFirst({
            where: { id, userId },
        });
        if (!item) {
            throw new NotFoundException('Wardrobe item not found');
        }
        return item;
    }
    toPublic(item) {
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
};
WardrobeService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        UploadsService,
        AiService])
], WardrobeService);
export { WardrobeService };
//# sourceMappingURL=wardrobe.service.js.map