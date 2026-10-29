export type InspirationPin = {
    id: string;
    title: string;
    image: string;
    aspect: number;
    styles: string[];
    occasion: string;
    palette: string[];
    pieces: string[];
    vibe: string;
};
export declare class InspirationService {
    private readonly logger;
    readonly styles: string[];
    list(filters: {
        style?: string;
        occasion?: string;
        search?: string;
        page?: string;
        bookmarks?: string;
        gender?: string;
    }): Promise<{
        source: "pinterest";
        pins: InspirationPin[];
        page: number;
        hasMore: boolean;
        nextBookmark: string | null;
        total?: undefined;
    } | {
        source: "curated";
        pins: InspirationPin[];
        page: number;
        hasMore: boolean;
        nextBookmark: null;
        total: number;
    }>;
    private pinterestSession;
    private pinterestSearch;
    get(id: string): InspirationPin;
}
