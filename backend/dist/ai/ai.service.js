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
    async generateText(prompt, system) {
        if (process.env.GROQ_API_KEY) {
            const r = await this.tryGroqText(prompt, system);
            if (r?.trim()) {
                this.logger.log('Provider: Groq');
                return r;
            }
        }
        if (process.env.GEMINI_API_KEY) {
            const r = await this.tryGeminiText(prompt, system);
            if (r?.trim()) {
                this.logger.log('Provider: Gemini');
                return r;
            }
        }
        if (process.env.OPENAI_API_KEY) {
            const r = await this.tryOpenAIText(prompt, system);
            if (r?.trim()) {
                this.logger.log('Provider: OpenAI');
                return r;
            }
        }
        this.logger.error('All AI providers failed or no keys configured');
        throw new Error('No AI provider available');
    }
    async tryGroqText(prompt, system) {
        try {
            const baseUrl = process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1';
            const model = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';
            const messages = [];
            if (system)
                messages.push({ role: 'system', content: system });
            messages.push({ role: 'user', content: prompt });
            const res = await fetch(`${baseUrl}/chat/completions`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ model, temperature: 0.7, max_tokens: 1024, messages }),
                signal: AbortSignal.timeout(30_000),
            });
            if (!res.ok) {
                const body = await res.text().catch(() => '');
                this.logger.warn(`Groq failed ${res.status}: ${body.slice(0, 200)}`);
                return null;
            }
            const data = (await res.json());
            const msg = data?.choices?.[0]?.message;
            return msg?.content || msg?.reasoning || null;
        }
        catch (err) {
            this.logger.warn(`Groq error: ${err.message}`);
            return null;
        }
    }
    async tryGeminiText(prompt, system) {
        try {
            const baseUrl = process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai';
            const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
            const messages = [];
            if (system)
                messages.push({ role: 'system', content: system });
            messages.push({ role: 'user', content: prompt });
            const res = await fetch(`${baseUrl}/chat/completions`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ model, temperature: 0.7, max_tokens: 1024, messages }),
                signal: AbortSignal.timeout(30_000),
            });
            if (!res.ok) {
                const body = await res.text().catch(() => '');
                this.logger.warn(`Gemini failed ${res.status}: ${body.slice(0, 200)}`);
                return null;
            }
            const data = (await res.json());
            return data?.choices?.[0]?.message?.content ?? null;
        }
        catch (err) {
            this.logger.warn(`Gemini error: ${err.message}`);
            return null;
        }
    }
    async tryOpenAIText(prompt, system) {
        try {
            const messages = [];
            if (system)
                messages.push({ role: 'system', content: system });
            messages.push({ role: 'user', content: prompt });
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ model: process.env.OPENAI_TEXT_MODEL || 'gpt-4o-mini', temperature: 0.7, max_tokens: 1024, messages }),
                signal: AbortSignal.timeout(45_000),
            });
            if (!res.ok) {
                const body = await res.text().catch(() => '');
                this.logger.warn(`OpenAI failed ${res.status}: ${body.slice(0, 200)}`);
                return null;
            }
            const data = (await res.json());
            return data?.choices?.[0]?.message?.content ?? null;
        }
        catch (err) {
            this.logger.warn(`OpenAI error: ${err.message}`);
            return null;
        }
    }
    async extractWardrobeDraft(imageUrl) {
        if (process.env.GEMINI_API_KEY) {
            const result = await this.tryGeminiVision(imageUrl);
            if (result)
                return result;
        }
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
    async tryGeminiVision(imageUrl) {
        try {
            const baseUrl = process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai';
            const model = process.env.GEMINI_VISION_MODEL || process.env.GEMINI_MODEL || 'gemini-1.5-flash';
            const res = await fetch(`${baseUrl}/chat/completions`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model,
                    temperature: 0.2,
                    response_format: { type: 'json_object' },
                    messages: [
                        {
                            role: 'system',
                            content: 'You catalogue clothing photos. Return ONLY JSON with keys: ' +
                                FIELDS +
                                '. category must be one of: top, bottom, outerwear, dress, shoes, accessory. secondaryColors and styleTags arrays. Use null for unknown. season spring/summer/autumn/winter/all-season.',
                        },
                        {
                            role: 'user',
                            content: [
                                { type: 'text', text: `Classify main clothing item. Return JSON with keys: ${FIELDS}.` },
                                { type: 'image_url', image_url: { url: imageUrl } },
                            ],
                        },
                    ],
                }),
                signal: AbortSignal.timeout(60_000),
            });
            if (!res.ok) {
                this.logger.warn(`Gemini vision failed ${res.status}`);
                return null;
            }
            const data = (await res.json());
            const content = data?.choices?.[0]?.message?.content;
            if (!content)
                return null;
            const parsed = typeof content === 'string' ? this.extractJson(content) : content;
            return this.sanitize(parsed);
        }
        catch (err) {
            this.logger.warn(`Gemini vision error: ${err.message}`);
            return null;
        }
    }
    async tryNvidia(imageUrl) {
        const apiKey = process.env.NVIDIA_API_KEY;
        const baseUrl = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1';
        const model = process.env.NVIDIA_VISION_MODEL || 'meta/llama-3.2-11b-vision-instruct';
        try {
            const response = await fetch(`${baseUrl}/chat/completions`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model,
                    temperature: 0.2,
                    max_tokens: 512,
                    messages: [
                        {
                            role: 'system',
                            content: 'You catalogue clothing photos. Return ONLY valid JSON with keys: ' +
                                FIELDS +
                                '. category must be one of: top, bottom, outerwear, dress, shoes, accessory. secondaryColors and styleTags must be arrays. Use null for unknown. season: spring/summer/autumn/winter/all-season.',
                        },
                        {
                            role: 'user',
                            content: [
                                { type: 'text', text: `Classify the main clothing item. Return JSON only with keys: ${FIELDS}.` },
                                { type: 'image_url', image_url: { url: imageUrl } },
                            ],
                        },
                    ],
                }),
                signal: AbortSignal.timeout(60_000),
            });
            if (!response.ok) {
                this.logger.warn(`NVIDIA vision failed ${response.status}`);
                return null;
            }
            const payload = (await response.json());
            const content = payload.choices?.[0]?.message?.content;
            if (!content)
                return null;
            return this.sanitize(this.extractJson(content));
        }
        catch (err) {
            this.logger.warn(`NVIDIA vision error: ${err.message}`);
            return null;
        }
    }
    async tryOpenAI(imageUrl) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: process.env.OPENAI_VISION_MODEL ?? 'gpt-4o-mini',
                    temperature: 0.2,
                    response_format: { type: 'json_object' },
                    messages: [
                        {
                            role: 'system',
                            content: 'You catalogue clothing photos. Return ONLY a JSON object. ' +
                                'category must be one of: top, bottom, outerwear, dress, shoes, accessory. ' +
                                'secondaryColors and styleTags must be arrays. Use null for unknown. season: spring/summer/autumn/winter/all-season.',
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
                signal: AbortSignal.timeout(45_000),
            });
            if (!response.ok) {
                this.logger.warn(`OpenAI vision failed ${response.status}`);
                return null;
            }
            const payload = (await response.json());
            const content = payload.choices?.[0]?.message?.content;
            if (!content)
                return null;
            return this.sanitize(JSON.parse(content));
        }
        catch (err) {
            this.logger.warn(`OpenAI vision error: ${err.message}`);
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
        if (subcategory)
            subcategory = this.stripCategoryWords(subcategory);
        let color = this.text(input.color);
        color = color ? color.toLowerCase().replace(/[^a-z\s]/g, '').trim() : '';
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
            .filter((e) => typeof e === 'string')
            .map((e) => e.trim())
            .filter(Boolean)
            .slice(0, 12);
    }
};
AiService = AiService_1 = __decorate([
    Injectable()
], AiService);
export { AiService };
//# sourceMappingURL=ai.service.js.map