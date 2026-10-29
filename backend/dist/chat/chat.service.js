var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ChatService_1;
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { AiService } from '../ai/ai.service.js';
const FORMALITY_RANK = {
    casual: 1, smart_casual: 2, 'smart casual': 2, business_casual: 3, 'business casual': 3,
    semi_formal: 4, 'semi formal': 4, formal: 5, black_tie: 6, 'black tie': 6,
};
const OCCASION_FORMALITY = {
    casual: 1, 'movie night': 1, 'movie night with friends': 1, gym: 1, beach: 1,
    brunch: 2, college: 2, work: 3, office: 3, date: 3, 'date night': 3,
    party: 3, wedding: 5, formal: 5, gala: 6,
};
const MIO_SYSTEM = `You are Mio, a warm and slightly playful anime waifu stylist for the Miori app.

STRICT RULES — follow every one:
1. NEVER introduce yourself again after the first message. No "Hi I'm Mio" mid-conversation.
2. NEVER re-ask the occasion if the user already stated it in this conversation.
3. When wardrobe data is provided, you MUST cite actual items by their id, category, subcategory, and color. Do not invent items.
4. For styling requests: suggest 1–2 complete outfits (top + bottom + shoes, or dress + shoes). Each outfit must reference real item IDs from the wardrobe data.
5. For shopping/gap requests: list specific missing item types with brief reasoning.
6. Keep replies concise and actionable. Warm tone, not verbose.
7. If the wardrobe is empty, say so and offer general advice instead.`;
function extractText(content) {
    if (typeof content === 'string')
        return content;
    if (content && typeof content === 'object') {
        const c = content;
        if (typeof c.text === 'string')
            return c.text;
    }
    return '';
}
function scoreItem(item, targetFormality) {
    let score = 0;
    if (item.favorite)
        score += 30;
    score += Math.min(item.wearCount * 2, 20);
    const daysSince = (Date.now() - new Date(item.updatedAt).getTime()) / 86_400_000;
    if (daysSince < 30)
        score += 10;
    const itemFormality = FORMALITY_RANK[item.formality?.toLowerCase() ?? ''] ?? 2;
    score += Math.max(0, 5 - Math.abs(itemFormality - targetFormality) * 2);
    return score;
}
let ChatService = ChatService_1 = class ChatService {
    prisma;
    ai;
    logger = new Logger(ChatService_1.name);
    constructor(prisma, ai) {
        this.prisma = prisma;
        this.ai = ai;
    }
    async getOrCreateConversation(userId) {
        let conv = await this.prisma.conversation.findFirst({
            where: { userId },
            orderBy: { updatedAt: 'desc' },
        });
        if (!conv) {
            conv = await this.prisma.conversation.create({
                data: { userId, title: 'Mio — Stylist Waifu' },
            });
        }
        return conv;
    }
    async getMessages(userId, conversationId) {
        const conv = await this.prisma.conversation.findFirst({ where: { id: conversationId, userId } });
        if (!conv)
            throw new Error('Conversation not found');
        return this.prisma.message.findMany({
            where: { conversationId },
            orderBy: { createdAt: 'asc' },
        });
    }
    needsWardrobe(userMsg, historyText) {
        const msg = userMsg.toLowerCase().trim();
        const hist = historyText.toLowerCase();
        if (/\b(outfit|wear|dress|style|look|fit|fitcheck|what.*wear|plan.*outfit|get.*dressed)\b/.test(msg))
            return true;
        if (/\b(movie night|date night|date|party|gym|work|office|college|brunch|wedding|gala|beach|casual|formal)\b/.test(msg))
            return true;
        if (/\b(shopping|buy|need|missing|gap|wardrobe|closet)\b/.test(msg))
            return true;
        const isConfirmation = /^(yes|yeah|yep|sure|go on|go ahead|tell me|show me|pull|do it|ok|okay|please|yup|absolutely|of course|sounds good|let's go|let me see|show me|go for it)/.test(msg);
        const hadStylingContext = /\b(outfit|wear|style|look|occasion|closet|wardrobe|movie night|date|party|what to wear)\b/.test(hist);
        if (isConfirmation && hadStylingContext)
            return true;
        return false;
    }
    extractOccasion(userMsg, historyText) {
        const combined = (userMsg + ' ' + historyText).toLowerCase();
        const occasions = [
            'movie night with friends', 'movie night', 'date night', 'date', 'wedding', 'gala',
            'gym', 'beach', 'brunch', 'college', 'work', 'office', 'party', 'formal', 'casual',
        ];
        for (const occ of occasions) {
            if (combined.includes(occ))
                return occ;
        }
        return 'casual';
    }
    async sendMessage(userId, content) {
        const conv = await this.getOrCreateConversation(userId);
        const userMsg = await this.prisma.message.create({
            data: { conversationId: conv.id, role: 'USER', content: { text: content } },
        });
        const history = await this.prisma.message.findMany({
            where: { conversationId: conv.id },
            orderBy: { createdAt: 'asc' },
            take: 16,
        });
        const historyText = history
            .filter((m) => m.id !== userMsg.id)
            .map((m) => `${m.role === 'USER' ? 'User' : 'Mio'}: ${extractText(m.content)}`)
            .join('\n');
        const isFirstMessage = history.filter((m) => m.role === 'ASSISTANT').length === 0;
        let userPrompt;
        let structuredOutfits = [];
        let itemById = new Map();
        if (this.needsWardrobe(content, historyText)) {
            const occasion = this.extractOccasion(content, historyText);
            const targetFormality = OCCASION_FORMALITY[occasion] ?? 2;
            const [allItems, savedOutfits, prefs] = await Promise.all([
                this.prisma.wardrobeItem.findMany({
                    where: { userId, status: 'SAVED' },
                    orderBy: { updatedAt: 'desc' },
                }),
                this.prisma.outfit.findMany({
                    where: { userId },
                    include: { outfitItems: { include: { wardrobeItem: true } } },
                    take: 6,
                    orderBy: { createdAt: 'desc' },
                }),
                this.prisma.stylePreferences.findUnique({ where: { userId } }),
            ]);
            const scored = allItems
                .map((item) => ({
                id: item.id,
                category: item.category,
                subcategory: item.subcategory,
                color: item.color,
                pattern: item.pattern,
                formality: item.formality,
                season: item.season,
                favorite: item.favorite,
                wearCount: item.wearCount,
                imageUrl: item.imageUrl || item.photoUrl || item.image || null,
                score: scoreItem({ favorite: item.favorite, wearCount: item.wearCount, updatedAt: item.updatedAt, formality: item.formality }, targetFormality),
            }))
                .sort((a, b) => b.score - a.score);
            const byCategory = {};
            for (const item of scored) {
                if (!byCategory[item.category])
                    byCategory[item.category] = [];
                if (byCategory[item.category].length < 5)
                    byCategory[item.category].push(item);
            }
            const topItems = Object.values(byCategory).flat();
            itemById = new Map(topItems.map((i) => [i.id, i]));
            const outfitSummary = savedOutfits.map((o) => ({
                title: o.title,
                occasion: o.occasion,
                items: o.outfitItems.map((oi) => `${oi.wardrobeItem.category}/${oi.wardrobeItem.subcategory ?? ''}(${oi.wardrobeItem.color ?? ''})`),
            }));
            userPrompt = [
                historyText ? `CONVERSATION SO FAR:\n${historyText}` : '',
                `OCCASION: ${occasion} (formality target: ${targetFormality}/6)`,
                `WARDROBE (top-scored items, use their IDs in your outfit suggestions):\n${JSON.stringify(topItems, null, 2)}`,
                savedOutfits.length ? `SAVED OUTFITS:\n${JSON.stringify(outfitSummary, null, 2)}` : '',
                prefs ? `STYLE PREFS:\n${JSON.stringify(prefs)}` : '',
                `USER: ${content}`,
                '',
                isFirstMessage
                    ? 'Greet the user briefly as Mio, then give a direct outfit suggestion using actual wardrobe items above (cite item IDs). If wardrobe is empty, say so.'
                    : 'Continue the conversation as Mio. Do NOT reintroduce yourself. Give a direct outfit suggestion using actual wardrobe items above (cite item IDs). If wardrobe is empty, say so.',
            ]
                .filter(Boolean)
                .join('\n\n');
        }
        else {
            userPrompt = [
                historyText ? `CONVERSAGEN SO FAR:\n${historyText}` : '',
                `USER: ${content}`,
                '',
                isFirstMessage
                    ? 'Greet the user briefly as Mio and respond to their message.'
                    : 'Continue the conversation as Mio. Do NOT reintroduce yourself.',
            ]
                .filter(Boolean)
                .join('\n\n');
        }
        let reply = '';
        try {
            reply = await this.ai.generateText(userPrompt, MIO_SYSTEM);
            if (!reply?.trim())
                throw new Error('Empty response from AI');
        }
        catch (err) {
            this.logger.error(`AI call failed: ${err.message}`);
            reply = "Hmm~ I'm having a little trouble connecting right now. Try again in a sec? 🌸";
        }
        if (this.needsWardrobe(content, historyText) && reply?.trim()) {
            const ID_RE = /\b(c[a-z0-9]{20,26})\b/g;
            const hasOptions = /\bOption\s+\d/i.test(reply);
            if (hasOptions) {
                const blocks = reply.split(/(?=\*{0,2}Option\s+\d)/i).filter(Boolean);
                for (const block of blocks) {
                    const titleMatch = block.match(/Option\s+(\d+)[^\n]*/i);
                    const title = titleMatch ? `Option ${titleMatch[1]}` : null;
                    if (!title)
                        continue;
                    const ids = [...new Set([...block.matchAll(ID_RE)].map((m) => m[1]))];
                    const items = ids.map((id) => itemById.get(id)).filter(Boolean);
                    if (items.length >= 2)
                        structuredOutfits.push({ title, items });
                }
            }
            else {
                const ids = [...new Set([...reply.matchAll(ID_RE)].map((m) => m[1]))];
                const items = ids.map((id) => itemById.get(id)).filter(Boolean);
                if (items.length >= 2)
                    structuredOutfits.push({ title: 'Outfit', items });
            }
        }
        const assistantMsg = await this.prisma.message.create({
            data: {
                conversationId: conv.id,
                role: 'ASSISTANT',
                content: { text: reply, persona: 'mio', ...(structuredOutfits.length ? { outfits: structuredOutfits } : {}) },
            },
        });
        await this.prisma.conversation.update({ where: { id: conv.id }, data: { updatedAt: new Date() } });
        return { conversationId: conv.id, userMessage: userMsg, assistantMessage: assistantMsg };
    }
    async listConversations(userId) {
        return this.prisma.conversation.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' },
            include: { messages: { take: 1, orderBy: { createdAt: 'desc' } } },
        });
    }
};
ChatService = ChatService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService, AiService])
], ChatService);
export { ChatService };
//# sourceMappingURL=chat.service.js.map