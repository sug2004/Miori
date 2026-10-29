import * as runtime from "@prisma/client/runtime/client";
export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export const PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export const PrismaClientValidationError = runtime.PrismaClientValidationError;
export const sql = runtime.sqltag;
export const empty = runtime.empty;
export const join = runtime.join;
export const raw = runtime.raw;
export const Sql = runtime.Sql;
export const Decimal = runtime.Decimal;
export const getExtensionContext = runtime.Extensions.getExtensionContext;
export const prismaVersion = {
    client: "7.10.0",
    engine: "0edf323efd1d98336f3f0a68684b56f689b900d3"
};
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    User: 'User',
    UserProfile: 'UserProfile',
    StylePreferences: 'StylePreferences',
    WardrobeItem: 'WardrobeItem',
    Outfit: 'Outfit',
    OutfitItem: 'OutfitItem',
    Conversation: 'Conversation',
    Message: 'Message',
    ShoppingRecommendation: 'ShoppingRecommendation',
    CharacterProfile: 'CharacterProfile'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const UserProfileScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    displayName: 'displayName',
    avatarUrl: 'avatarUrl',
    bio: 'bio',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    gender: 'gender'
};
export const StylePreferencesScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    styleGoals: 'styleGoals',
    styleTags: 'styleTags',
    colorPalette: 'colorPalette',
    preferredCategories: 'preferredCategories',
    budgetMin: 'budgetMin',
    budgetMax: 'budgetMax',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const WardrobeItemScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    imageUrl: 'imageUrl',
    category: 'category',
    subcategory: 'subcategory',
    color: 'color',
    secondaryColors: 'secondaryColors',
    pattern: 'pattern',
    material: 'material',
    fit: 'fit',
    styleTags: 'styleTags',
    formality: 'formality',
    season: 'season',
    brand: 'brand',
    purchaseDate: 'purchaseDate',
    price: 'price',
    favorite: 'favorite',
    wearCount: 'wearCount',
    notes: 'notes',
    status: 'status',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const OutfitScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    title: 'title',
    occasion: 'occasion',
    notes: 'notes',
    isFavorite: 'isFavorite',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const OutfitItemScalarFieldEnum = {
    id: 'id',
    outfitId: 'outfitId',
    wardrobeItemId: 'wardrobeItemId',
    position: 'position'
};
export const ConversationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    title: 'title',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const MessageScalarFieldEnum = {
    id: 'id',
    conversationId: 'conversationId',
    role: 'role',
    content: 'content',
    createdAt: 'createdAt'
};
export const ShoppingRecommendationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    category: 'category',
    title: 'title',
    description: 'description',
    reason: 'reason',
    productUrl: 'productUrl',
    imageUrl: 'imageUrl',
    price: 'price',
    source: 'source',
    createdAt: 'createdAt'
};
export const CharacterProfileScalarFieldEnum = {
    id: 'id',
    name: 'name',
    personality: 'personality',
    greeting: 'greeting',
    avatarUrl: 'avatarUrl',
    isDefault: 'isDefault',
    createdAt: 'createdAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const NullableJsonNullValueInput = {
    DbNull: DbNull,
    JsonNull: JsonNull
};
export const JsonNullValueInput = {
    JsonNull: JsonNull
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
export const JsonNullValueFilter = {
    DbNull: DbNull,
    JsonNull: JsonNull,
    AnyNull: AnyNull
};
export const defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map