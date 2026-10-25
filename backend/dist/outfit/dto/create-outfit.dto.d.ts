declare class OutfitItemDto {
    wardrobeItemId: string;
    position?: number;
}
export declare class CreateOutfitDto {
    title: string;
    occasion?: string;
    notes?: string;
    isFavorite?: boolean;
    items: OutfitItemDto[];
}
export {};
