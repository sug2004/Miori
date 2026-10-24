import type { WardrobeDraft, WardrobeItem, WardrobeStatus } from '@/types/api';

export const WARDROBE_CATEGORIES = [
  { value: 'top', label: 'Tops' },
  { value: 'bottom', label: 'Bottoms' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'dress', label: 'Dresses' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'accessory', label: 'Accessories' },
] as const;

export const FORMALITY_OPTIONS = [
  'casual',
  'smart-casual',
  'business',
  'formal',
  'athletic',
  'party',
] as const;

export const SEASON_OPTIONS = ['spring', 'summer', 'autumn', 'winter', 'all-season'] as const;

export const SORT_OPTIONS = [
  { value: 'recent', label: 'Recent' },
  { value: 'worn', label: 'Most worn' },
  { value: 'favorite', label: 'Favorites' },
  { value: 'oldest', label: 'Oldest' },
] as const;

export interface WardrobeFormValue {
  imageUrl: string;
  category: string;
  subcategory: string;
  color: string;
  secondaryColors: string;
  pattern: string;
  material: string;
  fit: string;
  styleTags: string;
  formality: string;
  season: string;
  brand: string;
  price: string;
  notes: string;
}

export interface WardrobePayload {
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
  price?: number;
  notes?: string;
  status?: WardrobeStatus;
  source?: string;
}

export const EMPTY_WARDROBE_FORM: WardrobeFormValue = {
  imageUrl: '',
  category: 'top',
  subcategory: '',
  color: '',
  secondaryColors: '',
  pattern: '',
  material: '',
  fit: '',
  styleTags: '',
  formality: '',
  season: '',
  brand: '',
  price: '',
  notes: '',
};

function joinList(value: string[] | null | undefined): string {
  return Array.isArray(value) ? value.join(', ') : '';
}

export function draftToForm(draft: WardrobeDraft, imageUrl: string): WardrobeFormValue {
  const rawName = draft.subcategory?.trim() || '';
  const name = stripCategoryWords(rawName) || formatCategory(draft.category);
  const color = (draft.color || '').trim().toLowerCase();
  return {
    imageUrl,
    category: normalizeCategory(draft.category),
    subcategory: name,
    color,
    secondaryColors: joinList(draft.secondaryColors),
    pattern: draft.pattern ?? '',
    material: draft.material ?? '',
    fit: draft.fit ?? '',
    styleTags: joinList(draft.styleTags),
    formality: draft.formality ?? '',
    season: draft.season ?? '',
    brand: '',
    price: '',
    notes: '',
  };
}

function stripCategoryWords(name: string): string {
  if (!name) return '';
  return name
    .replace(/\b(top|bottom|outerwear|dress|shoes|shoe|accessory|accessories)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeCategory(category: string): string {
  const c = category.trim().toLowerCase();
  if (['top', 'bottom', 'outerwear', 'dress', 'shoes', 'accessory'].includes(c)) {
    return c;
  }
  if (c.includes('shoe')) return 'shoes';
  if (c.includes('dress')) return 'dress';
  if (c.includes('coat') || c.includes('jacket') || c.includes('hood')) return 'outerwear';
  if (c.includes('pant') || c.includes('jean') || c.includes('skirt') || c.includes('short') || c.includes('trouser')) return 'bottom';
  if (c.includes('hat') || c.includes('belt') || c.includes('bag') || c.includes('scarf')) return 'accessory';
  return 'top';
}

function formatCategory(category: string): string {
  return category
    .split(/[-_ ]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function itemToForm(item: WardrobeItem): WardrobeFormValue {
  return {
    imageUrl: item.imageUrl,
    category: item.category,
    subcategory: item.subcategory ?? '',
    color: item.color ?? '',
    secondaryColors: joinList(item.secondaryColors),
    pattern: item.pattern ?? '',
    material: item.material ?? '',
    fit: item.fit ?? '',
    styleTags: joinList(item.styleTags),
    formality: item.formality ?? '',
    season: item.season ?? '',
    brand: item.brand ?? '',
    price: item.price === null ? '' : String(item.price),
    notes: item.notes ?? '',
  };
}

function splitList(value: string): string[] {
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function optional(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function formToPayload(
  form: WardrobeFormValue,
  extra: Pick<WardrobePayload, 'status' | 'source'> = {},
): WardrobePayload {
  const price = Number.parseFloat(form.price);
  return {
    imageUrl: form.imageUrl.trim(),
    category: form.category,
    subcategory: optional(form.subcategory),
    color: optional(form.color),
    secondaryColors: splitList(form.secondaryColors),
    pattern: optional(form.pattern),
    material: optional(form.material),
    fit: optional(form.fit),
    styleTags: splitList(form.styleTags),
    formality: optional(form.formality),
    season: optional(form.season),
    brand: optional(form.brand),
    price: Number.isFinite(price) ? price : undefined,
    notes: optional(form.notes),
    ...extra,
  };
}

export function itemTitle(item: WardrobeItem): string {
  const name = item.subcategory || item.category;
  return name
    .split(/[-_ ]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function itemSubtitle(item: WardrobeItem): string {
  return [item.color, item.brand].filter(Boolean).join(' · ') || item.category;
}
