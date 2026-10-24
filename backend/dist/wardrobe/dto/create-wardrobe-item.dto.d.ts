export declare class CreateWardrobeItemDto {
    imageUrl: string;
    category: string;
    subcategory?: string;
    color?: string;
    secondaryColors?: string[];
    pattern?: string;
    material?: string;
    fit?: string;
    styleTags?: string[];
    formality?: string;
    season?: string;
    brand?: string;
    purchaseDate?: string;
    price?: number;
    favorite?: boolean;
    notes?: string;
    status?: 'DRAFT' | 'SAVED';
    source?: string;
}
