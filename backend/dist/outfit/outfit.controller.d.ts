import { OutfitService } from './outfit.service.js';
import { GenerateOutfitDto } from './dto/generate-outfit.dto.js';
import { StyleItemDto } from './dto/style-item.dto.js';
import { CreateOutfitDto } from './dto/create-outfit.dto.js';
import { UpdateOutfitDto } from './dto/update-outfit.dto.js';
type AuthUser = {
    id: string;
};
export declare class OutfitController {
    private readonly outfitService;
    constructor(outfitService: OutfitService);
    generate(user: AuthUser, dto: GenerateOutfitDto): Promise<{
        outfits: any[];
    }>;
    styleItem(user: AuthUser, dto: StyleItemDto): Promise<{
        looks: any[];
    }>;
    list(user: AuthUser): Promise<({
        outfitItems: ({
            wardrobeItem: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                styleTags: import("@prisma/client/runtime/client").JsonValue | null;
                imageUrl: string;
                category: string;
                subcategory: string | null;
                color: string | null;
                secondaryColors: import("@prisma/client/runtime/client").JsonValue | null;
                pattern: string | null;
                material: string | null;
                fit: string | null;
                formality: string | null;
                season: string | null;
                brand: string | null;
                purchaseDate: Date | null;
                price: import("@prisma/client-runtime-utils").Decimal | null;
                favorite: boolean;
                wearCount: number;
                notes: string | null;
                status: import("../generated/prisma/enums.js").ItemStatus;
                source: string;
            };
        } & {
            id: string;
            outfitId: string;
            wardrobeItemId: string;
            position: number;
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
    create(user: AuthUser, dto: CreateOutfitDto): Promise<{
        outfitItems: ({
            wardrobeItem: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                styleTags: import("@prisma/client/runtime/client").JsonValue | null;
                imageUrl: string;
                category: string;
                subcategory: string | null;
                color: string | null;
                secondaryColors: import("@prisma/client/runtime/client").JsonValue | null;
                pattern: string | null;
                material: string | null;
                fit: string | null;
                formality: string | null;
                season: string | null;
                brand: string | null;
                purchaseDate: Date | null;
                price: import("@prisma/client-runtime-utils").Decimal | null;
                favorite: boolean;
                wearCount: number;
                notes: string | null;
                status: import("../generated/prisma/enums.js").ItemStatus;
                source: string;
            };
        } & {
            id: string;
            outfitId: string;
            wardrobeItemId: string;
            position: number;
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
    get(user: AuthUser, id: string): Promise<{
        outfitItems: ({
            wardrobeItem: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                styleTags: import("@prisma/client/runtime/client").JsonValue | null;
                imageUrl: string;
                category: string;
                subcategory: string | null;
                color: string | null;
                secondaryColors: import("@prisma/client/runtime/client").JsonValue | null;
                pattern: string | null;
                material: string | null;
                fit: string | null;
                formality: string | null;
                season: string | null;
                brand: string | null;
                purchaseDate: Date | null;
                price: import("@prisma/client-runtime-utils").Decimal | null;
                favorite: boolean;
                wearCount: number;
                notes: string | null;
                status: import("../generated/prisma/enums.js").ItemStatus;
                source: string;
            };
        } & {
            id: string;
            outfitId: string;
            wardrobeItemId: string;
            position: number;
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
    update(user: AuthUser, id: string, dto: UpdateOutfitDto): Promise<{
        outfitItems: ({
            wardrobeItem: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                styleTags: import("@prisma/client/runtime/client").JsonValue | null;
                imageUrl: string;
                category: string;
                subcategory: string | null;
                color: string | null;
                secondaryColors: import("@prisma/client/runtime/client").JsonValue | null;
                pattern: string | null;
                material: string | null;
                fit: string | null;
                formality: string | null;
                season: string | null;
                brand: string | null;
                purchaseDate: Date | null;
                price: import("@prisma/client-runtime-utils").Decimal | null;
                favorite: boolean;
                wearCount: number;
                notes: string | null;
                status: import("../generated/prisma/enums.js").ItemStatus;
                source: string;
            };
        } & {
            id: string;
            outfitId: string;
            wardrobeItemId: string;
            position: number;
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
    remove(user: AuthUser, id: string): Promise<{
        success: boolean;
    }>;
}
export {};
