import { InspirationService } from './inspiration.service.js';
export declare class InspirationController {
    private readonly inspirationService;
    constructor(inspirationService: InspirationService);
    list(style?: string, occasion?: string, search?: string, page?: string, bookmarks?: string, gender?: string): Promise<{
        source: "pinterest";
        pins: import("./inspiration.service.js").InspirationPin[];
        page: number;
        hasMore: boolean;
        nextBookmark: string | null;
        total?: undefined;
    } | {
        source: "curated";
        pins: import("./inspiration.service.js").InspirationPin[];
        page: number;
        hasMore: boolean;
        nextBookmark: null;
        total: number;
    }>;
    styles(): {
        styles: string[];
    };
    get(id: string): import("./inspiration.service.js").InspirationPin;
}
