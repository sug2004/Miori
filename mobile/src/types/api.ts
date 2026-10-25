export interface PublicUser {
  id: string;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: PublicUser;
}

export interface MeResponse {
  user: PublicUser;
}

export interface StylePreferences {
  styleGoals: unknown;
  styleTags: unknown;
  colorPalette: unknown;
  preferredCategories: unknown;
  budgetMin: number | null;
  budgetMax: number | null;
}

export interface ProfileOverview {
  user: PublicUser;
  wardrobeItemCount: number;
  savedLooksCount: number;
  stylePreferences: StylePreferences | null;
}

export interface StylePreferencesResponse {
  stylePreferences: StylePreferences | null;
}

export type WardrobeStatus = 'DRAFT' | 'SAVED';

export interface WardrobeItem {
  id: string;
  userId: string;
  imageUrl: string;
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
  brand: string | null;
  purchaseDate: string | null;
  price: number | null;
  favorite: boolean;
  wearCount: number;
  notes: string | null;
  status: WardrobeStatus;
  source: string;
  createdAt: string;
  updatedAt: string;
}

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

export interface WardrobeListResponse {
  items: WardrobeItem[];
}

export interface WardrobeItemResponse {
  item: WardrobeItem;
}

export interface WardrobeUploadResponse {
  imageUrl: string;
  draft: WardrobeDraft;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export class ApiClientError extends Error {
  readonly status: number;
  readonly fields?: string[];

  constructor(status: number, message: string, fields?: string[]) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.fields = fields;
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export interface OutfitItem {
  id: string;
  outfitId?: string;
  wardrobeItemId: string;
  position: number;
  wardrobeItem: WardrobeItem;
}

export interface Outfit {
  id: string;
  userId?: string;
  title: string;
  occasion?: string | null;
  notes?: string | null;
  isFavorite: boolean;
  reason?: string;
  items?: OutfitItem[];
  outfitItems?: OutfitItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface GenerateOutfitsResponse {
  outfits: Outfit[];
}

export interface StyleItemResponse {
  looks: Outfit[];
}
