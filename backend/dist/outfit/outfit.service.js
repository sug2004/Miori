var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { AiService } from '../ai/ai.service.js';
const OCCASIONS = ['casual', 'work', 'date', 'night', 'outdoor', 'formal'];
const OCCASION_RULES = {
    casual: { formality: ['casual', 'relaxed'], season: ['spring', 'summer', 'autumn', 'winter', 'all-season'] },
    work: { formality: ['smart-casual', 'business-casual', 'formal'], season: ['spring', 'summer', 'autumn', 'winter', 'all-season'] },
    date: { formality: ['smart-casual', 'casual'], season: ['spring', 'summer', 'autumn', 'winter', 'all-season'] },
    night: { formality: ['smart-casual', 'formal', 'casual'], season: ['spring', 'summer', 'autumn', 'winter', 'all-season'] },
    outdoor: { formality: ['casual', 'relaxed'], season: ['spring', 'summer', 'autumn'] },
    formal: { formality: ['formal', 'business-casual'], season: ['spring', 'summer', 'autumn', 'winter', 'all-season'] },
};
let OutfitService = class OutfitService {
    prisma;
    ai;
    constructor(prisma, ai) {
        this.prisma = prisma;
        this.ai = ai;
    }
    async generate(userId, occasion, useItemIds) {
        const occ = occasion.toLowerCase().replace(/-/g, '_') || 'casual';
        const rules = OCCASION_RULES[occ] || OCCASION_RULES.casual;
        let items = await this.prisma.wardrobeItem.findMany({
            where: { userId },
        });
        if (useItemIds?.length) {
            items = items.filter((i) => useItemIds.includes(i.id));
        }
        const tops = [...items.filter((i) => i.category === 'top')].sort((a, b) => {
            const fa = (a.favorite ? 2 : 0) + (a.wearCount || 0) * 0.05;
            const fb = (b.favorite ? 2 : 0) + (b.wearCount || 0) * 0.05;
            return fb - fa;
        });
        const bottoms = [...items.filter((i) => i.category === 'bottom')].sort((a, b) => {
            const fa = (a.favorite ? 2 : 0) + (a.wearCount || 0) * 0.05;
            const fb = (b.favorite ? 2 : 0) + (b.wearCount || 0) * 0.05;
            return fb - fa;
        });
        const dresses = [...items.filter((i) => i.category === 'dress')];
        const shoes = [...items.filter((i) => i.category === 'shoes')];
        const outerwear = [...items.filter((i) => i.category === 'outerwear')];
        const accessories = [...items.filter((i) => i.category === 'accessory')];
        const outfits = [];
        for (let d = 0; d < dresses.length && outfits.length < 3; d++) {
            const dress = dresses[d];
            const shoe = shoes.find((s) => this.compatible(s, dress, rules));
            if (!shoe)
                continue;
            const coat = outerwear.find((o) => this.compatible(o, dress, rules));
            const acc = accessories.find((a) => this.compatible(a, dress, rules));
            const pieces = [dress, shoe];
            if (acc)
                pieces.push(acc);
            if (coat)
                pieces.push(coat);
            outfits.push(this.buildOutfit(pieces, occasion, `Dress + Footwear${acc ? ' + Accessory' : ''}${coat ? ' + Outerwear' : ''} — great for ${occasion}.`));
        }
        const isGym = /gym/i.test(occasion);
        if (isGym) {
            const gymTops = tops.filter((t) => /gym|tee|tshirt|tank|jersey|active/i.test((t.subcategory || t.name || '') + ' ' + (t.color || '')));
            const gymBottoms = bottoms.filter((b) => /track|jogger|short|gym|legging/i.test((b.subcategory || b.name || '') + ' ' + (b.color || '')));
            const gymShoes = shoes.filter((s) => /sneaker|run|trainer|gym/i.test((s.subcategory || s.name || '') + ' ' + (s.color || '')));
            const gt = gymTops.length ? gymTops : tops;
            const gb = gymBottoms.length ? gymBottoms : bottoms;
            const gs = gymShoes.length ? gymShoes : shoes;
            for (let t = 0; t < gt.length && outfits.length < 3; t++) {
                for (let b = 0; b < gb.length && outfits.length < 3; b++) {
                    if (!this.colorCompat(gt[t], gb[b]))
                        continue;
                    const shoe = gs.find((s) => true) || gs[0];
                    if (!shoe)
                        break;
                    const pieces = [gt[t], gb[b], shoe];
                    if (accessories[0])
                        pieces.push(accessories[0]);
                    outfits.push(this.buildOutfit(pieces, occasion, `Gym-ready: ${gt[t].subcategory || 'top'} + ${gb[b].subcategory || 'bottom'} + footwear.`));
                }
            }
        }
        const isWork = /work|office|interview/i.test(occasion);
        if (isWork && outfits.length < 3) {
            const workTops = tops.filter((t) => !/hoodie|sweat|gym|jersey|tank/i.test((t.subcategory || t.name || '') + ' ' + (t.category || '')));
            const workBottoms = bottoms.filter((b) => /pant|trouser|chino|jean/i.test((b.subcategory || b.name || '')) && !/track|jogger|short|gym/i.test((b.subcategory || b.name || '')));
            const workShoes = shoes.filter((s) => !/sneaker|trainer|run|gym|sport/i.test((s.subcategory || s.name || '')));
            const wt = workTops.length ? workTops : tops;
            const wb = workBottoms.length ? workBottoms : bottoms;
            const ws = workShoes.length ? workShoes : shoes;
            for (let t = 0; t < wt.length && outfits.length < 3; t++) {
                for (let b = 0; b < wb.length && outfits.length < 3; b++) {
                    if (!this.colorCompat(wt[t], wb[b]))
                        continue;
                    const shoe = ws[0] || shoes[0];
                    if (!shoe)
                        break;
                    const coat = outerwear[0];
                    const acc = accessories[0];
                    const pieces = [wt[t], wb[b], shoe];
                    if (acc)
                        pieces.push(acc);
                    if (coat)
                        pieces.push(coat);
                    outfits.unshift(this.buildOutfit(pieces, occasion, `Work-appropriate: ${wt[t].subcategory || 'top'} + ${wb[b].subcategory || 'bottom'} + polished footwear.`));
                }
            }
        }
        if (outfits.length < 3 && shoes.length > 0) {
            const shoe = shoes[0];
            if (dresses[0]) {
                const pieces = [dresses[0], shoe];
                if (accessories[0])
                    pieces.push(accessories[0]);
                if (outerwear[0])
                    pieces.push(outerwear[0]);
                if (!outfits.find((o) => o.items?.some((i) => i.wardrobeItemId === dresses[0].id))) {
                    outfits.push(this.buildOutfit(pieces, occasion, `Dress + Footwear — fit for ${occasion}.`));
                }
            }
            if (outfits.length < 3 && tops[0] && bottoms[0]) {
                const pieces = [tops[0], bottoms[0], shoe];
                if (accessories[0])
                    pieces.push(accessories[0]);
                if (outerwear[0])
                    pieces.push(outerwear[0]);
                if (!outfits.find((o) => o.items?.length >= 3)) {
                    outfits.push(this.buildOutfit(pieces, occasion, `Top + Bottom + Footwear — fit for ${occasion}.`));
                }
            }
        }
        if (outfits.length === 0 && items.length >= 2) {
            const [a, b, c] = items;
            const pieces = c ? [a, b, c] : [a, b];
            outfits.push(this.buildOutfit(pieces, occasion, `Mixed look built from your wardrobe for ${occasion}.`));
        }
        return { outfits: outfits.slice(0, 3) };
    }
    async styleItem(userId, wardrobeItemId) {
        const item = await this.prisma.wardrobeItem.findFirst({ where: { id: wardrobeItemId, userId } });
        if (!item)
            throw new NotFoundException('Item not found');
        const all = await this.prisma.wardrobeItem.findMany({ where: { userId } });
        const tops = all.filter((i) => i.category === 'top');
        const bottoms = all.filter((i) => i.category === 'bottom');
        const dresses = all.filter((i) => i.category === 'dress');
        const shoes = all.filter((i) => i.category === 'shoes');
        const outerwear = all.filter((i) => i.category === 'outerwear');
        const accessories = all.filter((i) => i.category === 'accessory');
        const looks = [];
        if (item.category === 'top') {
            for (const bottom of bottoms.slice(0, 3)) {
                if (!this.colorCompat(item, bottom))
                    continue;
                const shoe = shoes.find((s) => s) || shoes[0];
                if (!shoe)
                    continue;
                const coat = outerwear[0];
                const acc = accessories[0];
                const pieces = [item, bottom, shoe];
                if (acc)
                    pieces.push(acc);
                if (coat)
                    pieces.push(coat);
                looks.push(this.buildOutfit(pieces, 'casual', `Casual: ${item.subcategory || 'top'} with ${bottom.subcategory || 'bottom'}.`, 'Casual'));
            }
            if (looks.length < 3) {
                const bottom = bottoms.find((b) => this.colorCompat(item, b)) || bottoms[0];
                const shoe = shoes[0];
                if (bottom && shoe) {
                    const pieces = [item, bottom, shoe];
                    looks.push(this.buildOutfit(pieces, 'work', `Smart: polished pairing for work.`, 'Smart Casual'));
                }
            }
            if (looks.length < 3 && shoes[0] && bottoms[0]) {
                const pieces = [item, bottoms[0], shoes[0]];
                looks.push(this.buildOutfit(pieces, 'date', `Date night: clean and put together.`, 'Date Night'));
            }
        }
        else if (item.category === 'bottom') {
            for (const top of tops.slice(0, 3)) {
                if (!this.colorCompat(item, top))
                    continue;
                const shoe = shoes[0];
                if (!shoe)
                    continue;
                const pieces = [top, item, shoe];
                looks.push(this.buildOutfit(pieces, 'casual', `Easy pairing: ${top.subcategory || 'top'} + ${item.subcategory || 'bottom'}.`, 'Casual'));
            }
        }
        else if (item.category === 'dress') {
            const shoe = shoes[0];
            if (shoe) {
                const pieces = [item, shoe];
                if (accessories[0])
                    pieces.push(accessories[0]);
                if (outerwear[0])
                    pieces.push(outerwear[0]);
                looks.push(this.buildOutfit(pieces, 'date', 'Dress-forward look with minimal layering.', 'Date Night'));
            }
        }
        else if (item.category === 'shoes') {
            if (dresses.length) {
                const dress = dresses[0];
                const pieces = [dress, item];
                if (accessories[0])
                    pieces.push(accessories[0]);
                if (outerwear[0])
                    pieces.push(outerwear[0]);
                looks.push(this.buildOutfit(pieces, 'casual', 'Dress + footwear combo.', 'Casual'));
            }
            if (tops.length && bottoms.length) {
                const top = tops[0];
                const bottom = bottoms.find((b) => this.colorCompat(item, b)) || bottoms[0];
                const pieces = [top, bottom, item];
                if (accessories[0])
                    pieces.push(accessories[0]);
                if (outerwear[0])
                    pieces.push(outerwear[0]);
                looks.push(this.buildOutfit(pieces, 'casual', 'Top + Bottom + Footwear.', 'Casual'));
            }
        }
        else if (item.category === 'accessory' || item.category === 'outerwear') {
            if (tops.length && bottoms.length && shoes.length) {
                const pieces = [tops[0], bottoms[0], shoes[0], item];
                looks.push(this.buildOutfit(pieces, 'casual', 'Accent your look with this piece.', 'Casual'));
            }
            else if (dresses.length && shoes.length) {
                const pieces = [dresses[0], shoes[0], item];
                looks.push(this.buildOutfit(pieces, 'date', 'Dress + footwear + accent.', 'Date'));
            }
        }
        return { looks: looks.slice(0, 3) };
    }
    async list(userId) {
        return this.prisma.outfit.findMany({
            where: { userId },
            include: { outfitItems: { include: { wardrobeItem: true }, orderBy: { position: 'asc' } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async create(userId, dto) {
        const outfit = await this.prisma.outfit.create({
            data: {
                userId,
                title: dto.title,
                occasion: dto.occasion || null,
                notes: dto.notes || null,
                isFavorite: dto.isFavorite || false,
                outfitItems: {
                    create: (dto.items || []).map((it, idx) => ({
                        wardrobeItemId: it.wardrobeItemId,
                        position: it.position ?? idx,
                    })),
                },
            },
            include: { outfitItems: { include: { wardrobeItem: true }, orderBy: { position: 'asc' } } },
        });
        return outfit;
    }
    async get(userId, id) {
        const outfit = await this.prisma.outfit.findFirst({
            where: { id, userId },
            include: { outfitItems: { include: { wardrobeItem: true }, orderBy: { position: 'asc' } } },
        });
        if (!outfit)
            throw new NotFoundException('Outfit not found');
        return outfit;
    }
    async update(userId, id, dto) {
        await this.get(userId, id);
        return this.prisma.outfit.update({
            where: { id },
            data: {
                title: dto.title,
                occasion: dto.occasion,
                notes: dto.notes,
                isFavorite: dto.isFavorite,
            },
            include: { outfitItems: { include: { wardrobeItem: true }, orderBy: { position: 'asc' } } },
        });
    }
    async remove(userId, id) {
        await this.get(userId, id);
        await this.prisma.outfit.delete({ where: { id } });
        return { success: true };
    }
    matchesRules(item, rules) {
        const form = (item.formality || '').toLowerCase();
        if (form && rules.formality.length && !rules.formality.includes(form))
            return true;
        return true;
    }
    compatible(a, b, rules) {
        return this.matchesRules(a, rules) && this.matchesRules(b, rules);
    }
    colorCompat(a, b) {
        const ca = (a.color || '').toLowerCase();
        const cb = (b.color || '').toLowerCase();
        if (!ca || !cb)
            return true;
        if (ca === cb)
            return false;
        const neutrals = ['black', 'white', 'grey', 'gray', 'beige', 'cream', 'navy'];
        if (neutrals.includes(ca) || neutrals.includes(cb))
            return true;
        return true;
    }
    reason(top, bottom, occ) {
        if (occ === 'work')
            return 'polished and professional';
        if (occ === 'formal')
            return 'clean, sharp, and formal';
        if (occ === 'date')
            return 'clean contrast looks put-together';
        if (occ === 'night')
            return 'sleek and versatile';
        return 'easy, wearable, and balanced';
    }
    buildOutfit(pieces, occasion, reason, title) {
        return {
            id: `gen_${Math.random().toString(36).slice(2, 10)}`,
            title: title || `${occasion.charAt(0).toUpperCase() + occasion.slice(1)} Look`,
            occasion,
            reason,
            items: pieces.map((p, idx) => ({
                id: `gi_${idx}_${p.id}`,
                wardrobeItemId: p.id,
                position: idx,
                wardrobeItem: p,
            })),
        };
    }
};
OutfitService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService, AiService])
], OutfitService);
export { OutfitService };
//# sourceMappingURL=outfit.service.js.map