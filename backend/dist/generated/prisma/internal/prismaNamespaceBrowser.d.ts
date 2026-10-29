import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly UserProfile: "UserProfile";
    readonly StylePreferences: "StylePreferences";
    readonly WardrobeItem: "WardrobeItem";
    readonly Outfit: "Outfit";
    readonly OutfitItem: "OutfitItem";
    readonly Conversation: "Conversation";
    readonly Message: "Message";
    readonly ShoppingRecommendation: "ShoppingRecommendation";
    readonly CharacterProfile: "CharacterProfile";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const UserProfileScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly displayName: "displayName";
    readonly avatarUrl: "avatarUrl";
    readonly bio: "bio";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly gender: "gender";
};
export type UserProfileScalarFieldEnum = (typeof UserProfileScalarFieldEnum)[keyof typeof UserProfileScalarFieldEnum];
export declare const StylePreferencesScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly styleGoals: "styleGoals";
    readonly styleTags: "styleTags";
    readonly colorPalette: "colorPalette";
    readonly preferredCategories: "preferredCategories";
    readonly budgetMin: "budgetMin";
    readonly budgetMax: "budgetMax";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type StylePreferencesScalarFieldEnum = (typeof StylePreferencesScalarFieldEnum)[keyof typeof StylePreferencesScalarFieldEnum];
export declare const WardrobeItemScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly imageUrl: "imageUrl";
    readonly category: "category";
    readonly subcategory: "subcategory";
    readonly color: "color";
    readonly secondaryColors: "secondaryColors";
    readonly pattern: "pattern";
    readonly material: "material";
    readonly fit: "fit";
    readonly styleTags: "styleTags";
    readonly formality: "formality";
    readonly season: "season";
    readonly brand: "brand";
    readonly purchaseDate: "purchaseDate";
    readonly price: "price";
    readonly favorite: "favorite";
    readonly wearCount: "wearCount";
    readonly notes: "notes";
    readonly status: "status";
    readonly source: "source";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WardrobeItemScalarFieldEnum = (typeof WardrobeItemScalarFieldEnum)[keyof typeof WardrobeItemScalarFieldEnum];
export declare const OutfitScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly title: "title";
    readonly occasion: "occasion";
    readonly notes: "notes";
    readonly isFavorite: "isFavorite";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OutfitScalarFieldEnum = (typeof OutfitScalarFieldEnum)[keyof typeof OutfitScalarFieldEnum];
export declare const OutfitItemScalarFieldEnum: {
    readonly id: "id";
    readonly outfitId: "outfitId";
    readonly wardrobeItemId: "wardrobeItemId";
    readonly position: "position";
};
export type OutfitItemScalarFieldEnum = (typeof OutfitItemScalarFieldEnum)[keyof typeof OutfitItemScalarFieldEnum];
export declare const ConversationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly title: "title";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum];
export declare const MessageScalarFieldEnum: {
    readonly id: "id";
    readonly conversationId: "conversationId";
    readonly role: "role";
    readonly content: "content";
    readonly createdAt: "createdAt";
};
export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];
export declare const ShoppingRecommendationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly category: "category";
    readonly title: "title";
    readonly description: "description";
    readonly reason: "reason";
    readonly productUrl: "productUrl";
    readonly imageUrl: "imageUrl";
    readonly price: "price";
    readonly source: "source";
    readonly createdAt: "createdAt";
};
export type ShoppingRecommendationScalarFieldEnum = (typeof ShoppingRecommendationScalarFieldEnum)[keyof typeof ShoppingRecommendationScalarFieldEnum];
export declare const CharacterProfileScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly personality: "personality";
    readonly greeting: "greeting";
    readonly avatarUrl: "avatarUrl";
    readonly isDefault: "isDefault";
    readonly createdAt: "createdAt";
};
export type CharacterProfileScalarFieldEnum = (typeof CharacterProfileScalarFieldEnum)[keyof typeof CharacterProfileScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
