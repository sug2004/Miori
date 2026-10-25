import { Injectable, Logger } from '@nestjs/common';

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

const FIELDS =
  'category, subcategory, color, secondaryColors, pattern, material, fit, styleTags, formality, season';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  async extractWardrobeDraft(imageUrl: string): Promise<WardrobeDraft> {
    if (process.env.NVIDIA_API_KEY) {
      const result = await this.tryNvidia(imageUrl);
      if (result) return result;
    }
    if (process.env.OPENAI_API_KEY) {
      const result = await this.tryOpenAI(imageUrl);
      if (result) return result;
    }
    return this.fallbackDraft();
  }

  private async tryNvidia(imageUrl: string): Promise<WardrobeDraft | null> {
    const apiKey = process.env.NVIDIA_API_KEY!;
    const baseUrl = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1';
    const model =
      process.env.NVIDIA_VISION_MODEL || 'meta/llama-3.2-11b-vision-instruct';

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
              content:
                'You catalogue clothing photos. Return ONLY valid JSON with keys: ' +
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
        signal: AbortSignal.timeout(60_000),
      });

      if (!response.ok) {
        this.logger.warn(`NVIDIA vision request failed with ${response.status}`);
        return null;
      }

      const payload = (await response.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const content = payload.choices?.[0]?.message?.content;
      if (!content) return null;
      return this.sanitize(this.extractJson(content));
    } catch (err) {
      this.logger.warn(`NVIDIA vision extraction failed: ${(err as Error).message}`);
      return null;
    }
  }

  private async tryOpenAI(imageUrl: string): Promise<WardrobeDraft | null> {
    const apiKey = process.env.OPENAI_API_KEY!;
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
              content:
                'You catalogue clothing photos. Return ONLY a JSON object. ' +
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
        signal: AbortSignal.timeout(45_000),
      });

      if (!response.ok) {
        this.logger.warn(`OpenAI vision request failed with ${response.status}`);
        return null;
      }

      const payload = (await response.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const content = payload.choices?.[0]?.message?.content;
      if (!content) return null;
      return this.sanitize(JSON.parse(content) as Record<string, unknown>);
    } catch (err) {
      this.logger.warn(`OpenAI vision extraction failed: ${(err as Error).message}`);
      return null;
    }
  }

  private extractJson(content: string): Record<string, unknown> {
    const start = content.indexOf('{');
    const end = content.lastIndexOf('}');
    if (start >= 0 && end > start) {
      return JSON.parse(content.slice(start, end + 1)) as Record<string, unknown>;
    }
    return JSON.parse(content) as Record<string, unknown>;
  }

  private fallbackDraft(): WardrobeDraft {
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

  private sanitize(input: Record<string, unknown>): WardrobeDraft {
    const category = this.normalizeCategory(this.text(input.category));
    let subcategory = this.text(input.subcategory);
    if (subcategory) {
      subcategory = this.stripCategoryWords(subcategory);
    }
    let color = this.text(input.color);
    if (!color) {
      color = '';
    } else {
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

  private normalizeCategory(category: string | null): string {
    if (!category) return 'top';
    const c = category.trim().toLowerCase();
    if (['top', 'bottom', 'outerwear', 'dress', 'shoes', 'accessory'].includes(c)) return c;
    if (c.includes('shoe') || c.includes('boot') || c.includes('loafer') || c.includes('heel')) return 'shoes';
    if (c.includes('dress')) return 'dress';
    if (c.includes('coat') || c.includes('jacket') || c.includes('blazer') || c.includes('hood')) return 'outerwear';
    if (c.includes('pant') || c.includes('jean') || c.includes('trouser') || c.includes('skirt') || c.includes('short')) return 'bottom';
    if (c.includes('belt') || c.includes('bag') || c.includes('hat') || c.includes('scarf')) return 'accessory';
    return 'top';
  }

  private stripCategoryWords(name: string): string {
    return name
      .replace(/\b(top|bottom|outerwear|dress|shoes|shoe|accessory|accessories|shirt|tee|tshirt|t-shirt|hoodie|sweater|jacket|coat|blazer|pant|pants|trouser|jean|jeans|short|shorts|skirt|dress)\b/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private text(value: unknown): string | null {
    if (typeof value !== 'string') return null;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed.slice(0, 100) : null;
  }

  private textArray(value: unknown): string[] {
    if (!Array.isArray(value)) return [];
    return value
      .filter((entry): entry is string => typeof entry === 'string')
      .map((entry) => entry.trim())
      .filter(Boolean)
      .slice(0, 12);
  }
}
