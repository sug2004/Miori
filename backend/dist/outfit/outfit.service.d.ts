import { PrismaService } from '../prisma/prisma.service.js';
import { AiService } from '../ai/ai.service.js';
export declare class OutfitService {
    private readonly prisma;
    private readonly ai;
    constructor(prisma: PrismaService, ai: AiService);
    generate(userId: string, occasion: string, useItemIds?: string[]): Promise<{
        outfits: any[];
    }>;
    styleItem(userId: string, wardrobeItemId: string): Promise<{
        looks: any[];
    }>;
    list(userId: string): Promise<({
        outfitItems: ({
            wardrobeItem: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                styleTags: import("@prisma/client/runtime/client").JsonValue | null;
                status: import("../generated/prisma/enums.js").ItemStatus;
                category: string;
                subcategory: string | null;
                color: string | null;
                secondaryColors: import("@prisma/client/runtime/client").JsonValue | null;
                pattern: string | null;
                material: string | null;
                fit: string | null;
                formality: string | null;
                season: string | null;
                imageUrl: string;
                brand: string | null;
                purchaseDate: Date | null;
                price: import("@prisma/client-runtime-utils").Decimal | null;
                favorite: boolean;
                notes: string | null;
                source: string;
                wearCount: number;
            };
        } & {
            id: string;
            position: number;
            wardrobeItemId: string;
            outfitId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        notes: string | null;
        title: string;
        occasion: string | null;
        isFavorite: boolean;
    })[]>;
    create(userId: string, dto: any): Promise<{
        outfitItems: ({
            wardrobeItem: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                styleTags: import("@prisma/client/runtime/client").JsonValue | null;
                status: import("../generated/prisma/enums.js").ItemStatus;
                category: string;
                subcategory: string | null;
                color: string | null;
                secondaryColors: import("@prisma/client/runtime/client").JsonValue | null;
                pattern: string | null;
                material: string | null;
                fit: string | null;
                formality: string | null;
                season: string | null;
                imageUrl: string;
                brand: string | null;
                purchaseDate: Date | null;
                price: import("@prisma/client-runtime-utils").Decimal | null;
                favorite: boolean;
                notes: string | null;
                source: string;
                wearCount: number;
            };
        } & {
            id: string;
            position: number;
            wardrobeItemId: string;
            outfitId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        notes: string | null;
        title: string;
        occasion: string | null;
        isFavorite: boolean;
    }>;
    get(userId: string, id: string): Promise<{
        outfitItems: ({
            wardrobeItem: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                styleTags: import("@prisma/client/runtime/client").JsonValue | null;
                status: import("../generated/prisma/enums.js").ItemStatus;
                category: string;
                subcategory: string | null;
                color: string | null;
                secondaryColors: import("@prisma/client/runtime/client").JsonValue | null;
                pattern: string | null;
                material: string | null;
                fit: string | null;
                formality: string | null;
                season: string | null;
                imageUrl: string;
                brand: string | null;
                purchaseDate: Date | null;
                price: import("@prisma/client-runtime-utils").Decimal | null;
                favorite: boolean;
                notes: string | null;
                source: string;
                wearCount: number;
            };
        } & {
            id: string;
            position: number;
            wardrobeItemId: string;
            outfitId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        notes: string | null;
        title: string;
        occasion: string | null;
        isFavorite: boolean;
    }>;
    update(userId: string, id: string, dto: any): Promise<{
        outfitItems: ({
            wardrobeItem: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                styleTags: import("@prisma/client/runtime/client").JsonValue | null;
                status: import("../generated/prisma/enums.js").ItemStatus;
                category: string;
                subcategory: string | null;
                color: string | null;
                secondaryColors: import("@prisma/client/runtime/client").JsonValue | null;
                pattern: string | null;
                material: string | null;
                fit: string | null;
                formality: string | null;
                season: string | null;
                imageUrl: string;
                brand: string | null;
                purchaseDate: Date | null;
                price: import("@prisma/client-runtime-utils").Decimal | null;
                favorite: boolean;
                notes: string | null;
                source: string;
                wearCount: number;
            };
        } & {
            id: string;
            position: number;
            wardrobeItemId: string;
            outfitId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        notes: string | null;
        title: string;
        occasion: string | null;
        isFavorite: boolean;
    }>;
    remove(userId: string, id: string): Promise<{
        success: boolean;
    }>;
    private matchesRules;
    private compatible;
    private colorCompat;
    private reason;
    private buildOutfit;
}
