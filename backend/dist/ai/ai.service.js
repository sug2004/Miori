var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AiService_1;
import { Injectable, Logger } from '@nestjs/common';
const FIELDS = 'category, subcategory, color, secondaryColors, pattern, material, fit, styleTags, formality, season';
let AiService = AiService_1 = class AiService {
    logger = new Logger(AiService_1.name);
    async extractWardrobeDraft(imageUrl) {
        if (process.env.NVIDIA_API_KEY) {
            const result = await this.tryNvidia(imageUrl);
            if (result)
                return result;
        }
        if (process.env.OPENAI_API_KEY) {
            const result = await this.tryOpenAI(imageUrl);
            if (result)
                return result;
        }
        return this.fallbackDraft();
    }
    async tryNvidia(imageUrl) {
        const apiKey = process.env.NVIDIA_API_KEY;
        const baseUrl = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1';
        const model = process.env.NVIDIA_VISION_MODEL || 'meta/llama-3.2-11b-vision-instruct';
        try {
            const response = await fetch(`${baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model,
                    temperature: 0.2,
                    max_tokens: 512,
                    messages: [
                        {
                            role: 'system',
                            content: 'You catalogue clothing photos. Return ONLY valid JSON with keys: ' +
                                FIELDS +
                                '. Identify the exact garment type. Set category to exactly one of: top, bottom, outerwear, dress, shoes, accessory based on the item. Set subcategory to the specific item name like "Henley Shirt", "Oxford Shirt", "Crewneck Tee", "Ribbed Top", "Wide Leg Jeans", "Straight Jeans", "Blazer", "Trench Coat", "Dress", "Sneakers", "Loafers" WITHOUT prefixing with the category. Set color to the dominant visible color in lowercase (e.g. "black", "white", "navy", "beige", "olive") or null ONLY if truly unidentifiable. Always try to guess color if the item is visible. secondaryColors and styleTags must be arrays of short strings. Use null for unknown values. season should be one of: spring, summer, autumn, winter, all-season.',
                        },
                        {
                            role: 'user',
                            content: [
                                {
                                    type: 'text',
                                    text: 'Classify the main clothing item. Return JSON only with category, subcategory, color, secondaryColors, pattern, material, fit, styleTags, formality, season.',
                                },
                                { type: 'image_url', image_url: { url: imageUrl } },
                            ],
                        },
                    ],
                }),
                signal: AbortSignal.timeout(30_000),
            });
            if (!response.ok) {
                this.logger.warn(`NVIDIA vision request failed with ${response.status}`);
                return null;
            }
            const payload = (await response.json());
            const content = payload.choices?.[0]?.message?.content;
            if (!content)
                return null;
            return this.sanitize(this.extractJson(content));
        }
        catch (err) {
            this.logger.warn(`NVIDIA vision extraction failed: ${err.message}`);
            return null;
        }
    }
    async tryOpenAI(imageUrl) {
        const apiKey = process.env.OPENAI_API_KEY;
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: process.env.OPENAI_VISION_MODEL ?? 'gpt-4o-mini',
                    temperature: 0.2,
                    response_format: { type: 'json_object' },
                    messages: [
                        {
                            role: 'system',
                            content: 'You catalogue clothing photos. Return ONLY a JSON object. ' +
                                'category must be one of: top, bottom, outerwear, dress, shoes, accessory. ' +
                                'secondaryColors and styleTags must be arrays of short strings. ' +
                                'Use null for unknown values. season should be one of: spring, summer, autumn, winter, all-season.',
                        },
                        {
                            role: 'user',
                            content: [
                                { type: 'text', text: `Describe this clothing item as JSON with keys: ${FIELDS}.` },
                                { type: 'image_url', image_url: { url: imageUrl } },
                            ],
                        },
                    ],
                }),
                signal: AbortSignal.timeout(25_000),
            });
            if (!response.ok) {
                this.logger.warn(`OpenAI vision request failed with ${response.status}`);
                return null;
            }
            const payload = (await response.json());
            const content = payload.choices?.[0]?.message?.content;
            if (!content)
                return null;
            return this.sanitize(JSON.parse(content));
        }
        catch (err) {
            this.logger.warn(`OpenAI vision extraction failed: ${err.message}`);
            return null;
        }
    }
    extractJson(content) {
        const start = content.indexOf('{');
        const end = content.lastIndexOf('}');
        if (start >= 0 && end > start) {
            return JSON.parse(content.slice(start, end + 1));
        }
        return JSON.parse(content);
    }
    fallbackDraft() {
        return {
            category: 'top',
            subcategory: null,
            color: null,
            secondaryColors: [],
            pattern: null,
            material: null,
            fit: null,
            styleTags: [],
            formality: null,
            season: null,
            source: 'manual',
        };
    }
    sanitize(input) {
        const category = this.normalizeCategory(this.text(input.category));
        let subcategory = this.text(input.subcategory);
        if (subcategory) {
            subcategory = this.stripCategoryWords(subcategory);
        }
        let color = this.text(input.color);
        if (!color) {
            color = '';
        }
        else {
            color = color.toLowerCase().replace(/[^a-z\s]/g, '').trim();
        }
        return {
            category,
            subcategory,
            color: color || '',
            secondaryColors: this.textArray(input.secondaryColors),
            pattern: this.text(input.pattern),
            material: this.text(input.material),
            fit: this.text(input.fit),
            styleTags: this.textArray(input.styleTags),
            formality: this.text(input.formality),
            season: this.text(input.season),
            source: 'ai',
        };
    }
    normalizeCategory(category) {
        if (!category)
            return 'top';
        const c = category.trim().toLowerCase();
        if (['top', 'bottom', 'outerwear', 'dress', 'shoes', 'accessory'].includes(c))
            return c;
        if (c.includes('shoe') || c.includes('boot') || c.includes('loafer') || c.includes('heel'))
            return 'shoes';
        if (c.includes('dress'))
            return 'dress';
        if (c.includes('coat') || c.includes('jacket') || c.includes('blazer') || c.includes('hood'))
            return 'outerwear';
        if (c.includes('pant') || c.includes('jean') || c.includes('trouser') || c.includes('skirt') || c.includes('short'))
            return 'bottom';
        if (c.includes('belt') || c.includes('bag') || c.includes('hat') || c.includes('scarf'))
            return 'accessory';
        return 'top';
    }
    stripCategoryWords(name) {
        return name
            .replace(/\b(top|bottom|outerwear|dress|shoes|shoe|accessory|accessories|shirt|tee|tshirt|t-shirt|hoodie|sweater|jacket|coat|blazer|pant|pants|trouser|jean|jeans|short|shorts|skirt|dress)\b/gi, '')
            .replace(/\s+/g, ' ')
            .trim();
    }
    text(value) {
        if (typeof value !== 'string')
            return null;
        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed.slice(0, 100) : null;
    }
    textArray(value) {
        if (!Array.isArray(value))
            return [];
        return value
            .filter((entry) => typeof entry === 'string')
            .map((entry) => entry.trim())
            .filter(Boolean)
            .slice(0, 12);
    }
};
AiService = AiService_1 = __decorate([
    Injectable()
], AiService);
export { AiService };
//# sourceMappingURL=ai.service.js.map