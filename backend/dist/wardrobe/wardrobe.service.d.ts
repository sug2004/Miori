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
export declare class WardrobeService {
    private readonly prisma;
    private readonly uploads;
    private readonly ai;
    constructor(prisma: PrismaService, uploads: UploadsService, ai: AiService);
    list(userId: string, filters: WardrobeFilters): Promise<{
        items: {
            id: string;
            userId: string;
            imageUrl: string;
            category: string;
            subcategory: string | null;
            color: string | null;
            secondaryColors: string[];
            pattern: string | null;
            material: string | null;
            fit: string | null;
            styleTags: string[];
            formality: string | null;
            season: string | null;
            brand: string | null;
            purchaseDate: string | null;
            price: number | null;
            favorite: boolean;
            wearCount: number;
            notes: string | null;
            status: import("../generated/prisma/enums.js").ItemStatus;
            source: string;
            createdAt: string;
            updatedAt: string;
        }[];
    }>;
    get(userId: string, id: string): Promise<{
        item: {
            id: string;
            userId: string;
            imageUrl: string;
            category: string;
            subcategory: string | null;
            color: string | null;
            secondaryColors: string[];
            pattern: string | null;
            material: string | null;
            fit: string | null;
            styleTags: string[];
            formality: string | null;
            season: string | null;
            brand: string | null;
            purchaseDate: string | null;
            price: number | null;
            favorite: boolean;
            wearCount: number;
            notes: string | null;
            status: import("../generated/prisma/enums.js").ItemStatus;
            source: string;
            createdAt: string;
            updatedAt: string;
        };
    }>;
    create(userId: string, dto: CreateWardrobeItemDto): Promise<{
        item: {
            id: string;
            userId: string;
            imageUrl: string;
            category: string;
            subcategory: string | null;
            color: string | null;
            secondaryColors: string[];
            pattern: string | null;
            material: string | null;
            fit: string | null;
            styleTags: string[];
            formality: string | null;
            season: string | null;
            brand: string | null;
            purchaseDate: string | null;
            price: number | null;
            favorite: boolean;
            wearCount: number;
            notes: string | null;
            status: import("../generated/prisma/enums.js").ItemStatus;
            source: string;
            createdAt: string;
            updatedAt: string;
        };
    }>;
    update(userId: string, id: string, dto: UpdateWardrobeItemDto): Promise<{
        item: {
            id: string;
            userId: string;
            imageUrl: string;
            category: string;
            subcategory: string | null;
            color: string | null;
            secondaryColors: string[];
            pattern: string | null;
            material: string | null;
            fit: string | null;
            styleTags: string[];
            formality: string | null;
            season: string | null;
            brand: string | null;
            purchaseDate: string | null;
            price: number | null;
            favorite: boolean;
            wearCount: number;
            notes: string | null;
            status: import("../generated/prisma/enums.js").ItemStatus;
            source: string;
            createdAt: string;
            updatedAt: string;
        };
    }>;
    remove(userId: string, id: string): Promise<{
        success: boolean;
    }>;
    markWorn(userId: string, id: string): Promise<{
        item: {
            id: string;
            userId: string;
            imageUrl: string;
            category: string;
            subcategory: string | null;
            color: string | null;
            secondaryColors: string[];
            pattern: string | null;
            material: string | null;
            fit: string | null;
            styleTags: string[];
            formality: string | null;
            season: string | null;
            brand: string | null;
            purchaseDate: string | null;
            price: number | null;
            favorite: boolean;
            wearCount: number;
            notes: string | null;
            status: import("../generated/prisma/enums.js").ItemStatus;
            source: string;
            createdAt: string;
            updatedAt: string;
        };
    }>;
    createDraft(userId: string, file: ImageFile): Promise<{
        imageUrl: string;
        draft: WardrobeDraft;
    }>;
    private orderBy;
    private findOwned;
    private toPublic;
}
