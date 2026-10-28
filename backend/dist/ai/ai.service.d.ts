export interface WardrobeDraft {
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
    source: 'ai' | 'manual';
}
export declare class AiService {
    private readonly logger;
    generateText(prompt: string, system?: string): Promise<string>;
    private tryGroqText;
    private tryGeminiText;
    private tryOpenAIText;
    extractWardrobeDraft(imageUrl: string): Promise<WardrobeDraft>;
    private tryGeminiVision;
    private tryNvidia;
    private tryOpenAI;
    private extractJson;
    private fallbackDraft;
    private sanitize;
    private normalizeCategory;
    private stripCategoryWords;
    private text;
    private textArray;
}
