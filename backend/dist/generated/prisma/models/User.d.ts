import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    passwordHash: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    passwordHash: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    passwordHash: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    passwordHash?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    passwordHash?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    passwordHash?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserCountAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    profile?: Prisma.XOR<Prisma.UserProfileNullableScalarRelationFilter, Prisma.UserProfileWhereInput> | null;
    stylePreferences?: Prisma.XOR<Prisma.StylePreferencesNullableScalarRelationFilter, Prisma.StylePreferencesWhereInput> | null;
    wardrobeItems?: Prisma.WardrobeItemListRelationFilter;
    outfits?: Prisma.OutfitListRelationFilter;
    conversations?: Prisma.ConversationListRelationFilter;
    shoppingRecommendations?: Prisma.ShoppingRecommendationListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    profile?: Prisma.UserProfileOrderByWithRelationInput;
    stylePreferences?: Prisma.StylePreferencesOrderByWithRelationInput;
    wardrobeItems?: Prisma.WardrobeItemOrderByRelationAggregateInput;
    outfits?: Prisma.OutfitOrderByRelationAggregateInput;
    conversations?: Prisma.ConversationOrderByRelationAggregateInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    passwordHash?: Prisma.StringFilter<"User"> | string;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    profile?: Prisma.XOR<Prisma.UserProfileNullableScalarRelationFilter, Prisma.UserProfileWhereInput> | null;
    stylePreferences?: Prisma.XOR<Prisma.StylePreferencesNullableScalarRelationFilter, Prisma.StylePreferencesWhereInput> | null;
    wardrobeItems?: Prisma.WardrobeItemListRelationFilter;
    outfits?: Prisma.OutfitListRelationFilter;
    conversations?: Prisma.ConversationListRelationFilter;
    shoppingRecommendations?: Prisma.ShoppingRecommendationListRelationFilter;
}, "id" | "email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    passwordHash?: Prisma.StringWithAggregatesFilter<"User"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile?: Prisma.UserProfileCreateNestedOneWithoutUserInput;
    stylePreferences?: Prisma.StylePreferencesCreateNestedOneWithoutUserInput;
    wardrobeItems?: Prisma.WardrobeItemCreateNestedManyWithoutUserInput;
    outfits?: Prisma.OutfitCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile?: Prisma.UserProfileUncheckedCreateNestedOneWithoutUserInput;
    stylePreferences?: Prisma.StylePreferencesUncheckedCreateNestedOneWithoutUserInput;
    wardrobeItems?: Prisma.WardrobeItemUncheckedCreateNestedManyWithoutUserInput;
    outfits?: Prisma.OutfitUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.UserProfileUpdateOneWithoutUserNestedInput;
    stylePreferences?: Prisma.StylePreferencesUpdateOneWithoutUserNestedInput;
    wardrobeItems?: Prisma.WardrobeItemUpdateManyWithoutUserNestedInput;
    outfits?: Prisma.OutfitUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.UserProfileUncheckedUpdateOneWithoutUserNestedInput;
    stylePreferences?: Prisma.StylePreferencesUncheckedUpdateOneWithoutUserNestedInput;
    wardrobeItems?: Prisma.WardrobeItemUncheckedUpdateManyWithoutUserNestedInput;
    outfits?: Prisma.OutfitUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type UserCreateNestedOneWithoutProfileInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutProfileInput, Prisma.UserUncheckedCreateWithoutProfileInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutProfileInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutProfileInput, Prisma.UserUncheckedCreateWithoutProfileInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutProfileInput;
    upsert?: Prisma.UserUpsertWithoutProfileInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutProfileInput, Prisma.UserUpdateWithoutProfileInput>, Prisma.UserUncheckedUpdateWithoutProfileInput>;
};
export type UserCreateNestedOneWithoutStylePreferencesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStylePreferencesInput, Prisma.UserUncheckedCreateWithoutStylePreferencesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStylePreferencesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutStylePreferencesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStylePreferencesInput, Prisma.UserUncheckedCreateWithoutStylePreferencesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStylePreferencesInput;
    upsert?: Prisma.UserUpsertWithoutStylePreferencesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutStylePreferencesInput, Prisma.UserUpdateWithoutStylePreferencesInput>, Prisma.UserUncheckedUpdateWithoutStylePreferencesInput>;
};
export type UserCreateNestedOneWithoutWardrobeItemsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutWardrobeItemsInput, Prisma.UserUncheckedCreateWithoutWardrobeItemsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutWardrobeItemsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutWardrobeItemsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutWardrobeItemsInput, Prisma.UserUncheckedCreateWithoutWardrobeItemsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutWardrobeItemsInput;
    upsert?: Prisma.UserUpsertWithoutWardrobeItemsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutWardrobeItemsInput, Prisma.UserUpdateWithoutWardrobeItemsInput>, Prisma.UserUncheckedUpdateWithoutWardrobeItemsInput>;
};
export type UserCreateNestedOneWithoutOutfitsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOutfitsInput, Prisma.UserUncheckedCreateWithoutOutfitsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOutfitsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutOutfitsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOutfitsInput, Prisma.UserUncheckedCreateWithoutOutfitsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOutfitsInput;
    upsert?: Prisma.UserUpsertWithoutOutfitsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOutfitsInput, Prisma.UserUpdateWithoutOutfitsInput>, Prisma.UserUncheckedUpdateWithoutOutfitsInput>;
};
export type UserCreateNestedOneWithoutConversationsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutConversationsInput, Prisma.UserUncheckedCreateWithoutConversationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutConversationsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutConversationsInput, Prisma.UserUncheckedCreateWithoutConversationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutConversationsInput;
    upsert?: Prisma.UserUpsertWithoutConversationsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutConversationsInput, Prisma.UserUpdateWithoutConversationsInput>, Prisma.UserUncheckedUpdateWithoutConversationsInput>;
};
export type UserCreateNestedOneWithoutShoppingRecommendationsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutShoppingRecommendationsInput, Prisma.UserUncheckedCreateWithoutShoppingRecommendationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutShoppingRecommendationsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutShoppingRecommendationsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutShoppingRecommendationsInput, Prisma.UserUncheckedCreateWithoutShoppingRecommendationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutShoppingRecommendationsInput;
    upsert?: Prisma.UserUpsertWithoutShoppingRecommendationsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutShoppingRecommendationsInput, Prisma.UserUpdateWithoutShoppingRecommendationsInput>, Prisma.UserUncheckedUpdateWithoutShoppingRecommendationsInput>;
};
export type UserCreateWithoutProfileInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    stylePreferences?: Prisma.StylePreferencesCreateNestedOneWithoutUserInput;
    wardrobeItems?: Prisma.WardrobeItemCreateNestedManyWithoutUserInput;
    outfits?: Prisma.OutfitCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutProfileInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    stylePreferences?: Prisma.StylePreferencesUncheckedCreateNestedOneWithoutUserInput;
    wardrobeItems?: Prisma.WardrobeItemUncheckedCreateNestedManyWithoutUserInput;
    outfits?: Prisma.OutfitUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutProfileInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutProfileInput, Prisma.UserUncheckedCreateWithoutProfileInput>;
};
export type UserUpsertWithoutProfileInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutProfileInput, Prisma.UserUncheckedUpdateWithoutProfileInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutProfileInput, Prisma.UserUncheckedCreateWithoutProfileInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutProfileInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutProfileInput, Prisma.UserUncheckedUpdateWithoutProfileInput>;
};
export type UserUpdateWithoutProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    stylePreferences?: Prisma.StylePreferencesUpdateOneWithoutUserNestedInput;
    wardrobeItems?: Prisma.WardrobeItemUpdateManyWithoutUserNestedInput;
    outfits?: Prisma.OutfitUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    stylePreferences?: Prisma.StylePreferencesUncheckedUpdateOneWithoutUserNestedInput;
    wardrobeItems?: Prisma.WardrobeItemUncheckedUpdateManyWithoutUserNestedInput;
    outfits?: Prisma.OutfitUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutStylePreferencesInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile?: Prisma.UserProfileCreateNestedOneWithoutUserInput;
    wardrobeItems?: Prisma.WardrobeItemCreateNestedManyWithoutUserInput;
    outfits?: Prisma.OutfitCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutStylePreferencesInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile?: Prisma.UserProfileUncheckedCreateNestedOneWithoutUserInput;
    wardrobeItems?: Prisma.WardrobeItemUncheckedCreateNestedManyWithoutUserInput;
    outfits?: Prisma.OutfitUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutStylePreferencesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutStylePreferencesInput, Prisma.UserUncheckedCreateWithoutStylePreferencesInput>;
};
export type UserUpsertWithoutStylePreferencesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutStylePreferencesInput, Prisma.UserUncheckedUpdateWithoutStylePreferencesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutStylePreferencesInput, Prisma.UserUncheckedCreateWithoutStylePreferencesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutStylePreferencesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutStylePreferencesInput, Prisma.UserUncheckedUpdateWithoutStylePreferencesInput>;
};
export type UserUpdateWithoutStylePreferencesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.UserProfileUpdateOneWithoutUserNestedInput;
    wardrobeItems?: Prisma.WardrobeItemUpdateManyWithoutUserNestedInput;
    outfits?: Prisma.OutfitUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutStylePreferencesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.UserProfileUncheckedUpdateOneWithoutUserNestedInput;
    wardrobeItems?: Prisma.WardrobeItemUncheckedUpdateManyWithoutUserNestedInput;
    outfits?: Prisma.OutfitUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutWardrobeItemsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile?: Prisma.UserProfileCreateNestedOneWithoutUserInput;
    stylePreferences?: Prisma.StylePreferencesCreateNestedOneWithoutUserInput;
    outfits?: Prisma.OutfitCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutWardrobeItemsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile?: Prisma.UserProfileUncheckedCreateNestedOneWithoutUserInput;
    stylePreferences?: Prisma.StylePreferencesUncheckedCreateNestedOneWithoutUserInput;
    outfits?: Prisma.OutfitUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutWardrobeItemsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutWardrobeItemsInput, Prisma.UserUncheckedCreateWithoutWardrobeItemsInput>;
};
export type UserUpsertWithoutWardrobeItemsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutWardrobeItemsInput, Prisma.UserUncheckedUpdateWithoutWardrobeItemsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutWardrobeItemsInput, Prisma.UserUncheckedCreateWithoutWardrobeItemsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutWardrobeItemsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutWardrobeItemsInput, Prisma.UserUncheckedUpdateWithoutWardrobeItemsInput>;
};
export type UserUpdateWithoutWardrobeItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.UserProfileUpdateOneWithoutUserNestedInput;
    stylePreferences?: Prisma.StylePreferencesUpdateOneWithoutUserNestedInput;
    outfits?: Prisma.OutfitUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutWardrobeItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.UserProfileUncheckedUpdateOneWithoutUserNestedInput;
    stylePreferences?: Prisma.StylePreferencesUncheckedUpdateOneWithoutUserNestedInput;
    outfits?: Prisma.OutfitUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutOutfitsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile?: Prisma.UserProfileCreateNestedOneWithoutUserInput;
    stylePreferences?: Prisma.StylePreferencesCreateNestedOneWithoutUserInput;
    wardrobeItems?: Prisma.WardrobeItemCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutOutfitsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile?: Prisma.UserProfileUncheckedCreateNestedOneWithoutUserInput;
    stylePreferences?: Prisma.StylePreferencesUncheckedCreateNestedOneWithoutUserInput;
    wardrobeItems?: Prisma.WardrobeItemUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutOutfitsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOutfitsInput, Prisma.UserUncheckedCreateWithoutOutfitsInput>;
};
export type UserUpsertWithoutOutfitsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOutfitsInput, Prisma.UserUncheckedUpdateWithoutOutfitsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOutfitsInput, Prisma.UserUncheckedCreateWithoutOutfitsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOutfitsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOutfitsInput, Prisma.UserUncheckedUpdateWithoutOutfitsInput>;
};
export type UserUpdateWithoutOutfitsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.UserProfileUpdateOneWithoutUserNestedInput;
    stylePreferences?: Prisma.StylePreferencesUpdateOneWithoutUserNestedInput;
    wardrobeItems?: Prisma.WardrobeItemUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutOutfitsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.UserProfileUncheckedUpdateOneWithoutUserNestedInput;
    stylePreferences?: Prisma.StylePreferencesUncheckedUpdateOneWithoutUserNestedInput;
    wardrobeItems?: Prisma.WardrobeItemUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutConversationsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile?: Prisma.UserProfileCreateNestedOneWithoutUserInput;
    stylePreferences?: Prisma.StylePreferencesCreateNestedOneWithoutUserInput;
    wardrobeItems?: Prisma.WardrobeItemCreateNestedManyWithoutUserInput;
    outfits?: Prisma.OutfitCreateNestedManyWithoutUserInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutConversationsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile?: Prisma.UserProfileUncheckedCreateNestedOneWithoutUserInput;
    stylePreferences?: Prisma.StylePreferencesUncheckedCreateNestedOneWithoutUserInput;
    wardrobeItems?: Prisma.WardrobeItemUncheckedCreateNestedManyWithoutUserInput;
    outfits?: Prisma.OutfitUncheckedCreateNestedManyWithoutUserInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutConversationsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutConversationsInput, Prisma.UserUncheckedCreateWithoutConversationsInput>;
};
export type UserUpsertWithoutConversationsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutConversationsInput, Prisma.UserUncheckedUpdateWithoutConversationsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutConversationsInput, Prisma.UserUncheckedCreateWithoutConversationsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutConversationsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutConversationsInput, Prisma.UserUncheckedUpdateWithoutConversationsInput>;
};
export type UserUpdateWithoutConversationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.UserProfileUpdateOneWithoutUserNestedInput;
    stylePreferences?: Prisma.StylePreferencesUpdateOneWithoutUserNestedInput;
    wardrobeItems?: Prisma.WardrobeItemUpdateManyWithoutUserNestedInput;
    outfits?: Prisma.OutfitUpdateManyWithoutUserNestedInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutConversationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.UserProfileUncheckedUpdateOneWithoutUserNestedInput;
    stylePreferences?: Prisma.StylePreferencesUncheckedUpdateOneWithoutUserNestedInput;
    wardrobeItems?: Prisma.WardrobeItemUncheckedUpdateManyWithoutUserNestedInput;
    outfits?: Prisma.OutfitUncheckedUpdateManyWithoutUserNestedInput;
    shoppingRecommendations?: Prisma.ShoppingRecommendationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutShoppingRecommendationsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile?: Prisma.UserProfileCreateNestedOneWithoutUserInput;
    stylePreferences?: Prisma.StylePreferencesCreateNestedOneWithoutUserInput;
    wardrobeItems?: Prisma.WardrobeItemCreateNestedManyWithoutUserInput;
    outfits?: Prisma.OutfitCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutShoppingRecommendationsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile?: Prisma.UserProfileUncheckedCreateNestedOneWithoutUserInput;
    stylePreferences?: Prisma.StylePreferencesUncheckedCreateNestedOneWithoutUserInput;
    wardrobeItems?: Prisma.WardrobeItemUncheckedCreateNestedManyWithoutUserInput;
    outfits?: Prisma.OutfitUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutShoppingRecommendationsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutShoppingRecommendationsInput, Prisma.UserUncheckedCreateWithoutShoppingRecommendationsInput>;
};
export type UserUpsertWithoutShoppingRecommendationsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutShoppingRecommendationsInput, Prisma.UserUncheckedUpdateWithoutShoppingRecommendationsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutShoppingRecommendationsInput, Prisma.UserUncheckedCreateWithoutShoppingRecommendationsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutShoppingRecommendationsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutShoppingRecommendationsInput, Prisma.UserUncheckedUpdateWithoutShoppingRecommendationsInput>;
};
export type UserUpdateWithoutShoppingRecommendationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.UserProfileUpdateOneWithoutUserNestedInput;
    stylePreferences?: Prisma.StylePreferencesUpdateOneWithoutUserNestedInput;
    wardrobeItems?: Prisma.WardrobeItemUpdateManyWithoutUserNestedInput;
    outfits?: Prisma.OutfitUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutShoppingRecommendationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.UserProfileUncheckedUpdateOneWithoutUserNestedInput;
    stylePreferences?: Prisma.StylePreferencesUncheckedUpdateOneWithoutUserNestedInput;
    wardrobeItems?: Prisma.WardrobeItemUncheckedUpdateManyWithoutUserNestedInput;
    outfits?: Prisma.OutfitUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCountOutputType = {
    wardrobeItems: number;
    outfits: number;
    conversations: number;
    shoppingRecommendations: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    wardrobeItems?: boolean | UserCountOutputTypeCountWardrobeItemsArgs;
    outfits?: boolean | UserCountOutputTypeCountOutfitsArgs;
    conversations?: boolean | UserCountOutputTypeCountConversationsArgs;
    shoppingRecommendations?: boolean | UserCountOutputTypeCountShoppingRecommendationsArgs;
};
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
export type UserCountOutputTypeCountWardrobeItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WardrobeItemWhereInput;
};
export type UserCountOutputTypeCountOutfitsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OutfitWhereInput;
};
export type UserCountOutputTypeCountConversationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationWhereInput;
};
export type UserCountOutputTypeCountShoppingRecommendationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShoppingRecommendationWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    profile?: boolean | Prisma.User$profileArgs<ExtArgs>;
    stylePreferences?: boolean | Prisma.User$stylePreferencesArgs<ExtArgs>;
    wardrobeItems?: boolean | Prisma.User$wardrobeItemsArgs<ExtArgs>;
    outfits?: boolean | Prisma.User$outfitsArgs<ExtArgs>;
    conversations?: boolean | Prisma.User$conversationsArgs<ExtArgs>;
    shoppingRecommendations?: boolean | Prisma.User$shoppingRecommendationsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "passwordHash" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    profile?: boolean | Prisma.User$profileArgs<ExtArgs>;
    stylePreferences?: boolean | Prisma.User$stylePreferencesArgs<ExtArgs>;
    wardrobeItems?: boolean | Prisma.User$wardrobeItemsArgs<ExtArgs>;
    outfits?: boolean | Prisma.User$outfitsArgs<ExtArgs>;
    conversations?: boolean | Prisma.User$conversationsArgs<ExtArgs>;
    shoppingRecommendations?: boolean | Prisma.User$shoppingRecommendationsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        profile: Prisma.$UserProfilePayload<ExtArgs> | null;
        stylePreferences: Prisma.$StylePreferencesPayload<ExtArgs> | null;
        wardrobeItems: Prisma.$WardrobeItemPayload<ExtArgs>[];
        outfits: Prisma.$OutfitPayload<ExtArgs>[];
        conversations: Prisma.$ConversationPayload<ExtArgs>[];
        shoppingRecommendations: Prisma.$ShoppingRecommendationPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserFieldRefs;
}
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    profile<T extends Prisma.User$profileArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$profileArgs<ExtArgs>>): Prisma.Prisma__UserProfileClient<runtime.Types.Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    stylePreferences<T extends Prisma.User$stylePreferencesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$stylePreferencesArgs<ExtArgs>>): Prisma.Prisma__StylePreferencesClient<runtime.Types.Result.GetResult<Prisma.$StylePreferencesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    wardrobeItems<T extends Prisma.User$wardrobeItemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$wardrobeItemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WardrobeItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    outfits<T extends Prisma.User$outfitsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$outfitsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    conversations<T extends Prisma.User$conversationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    shoppingRecommendations<T extends Prisma.User$shoppingRecommendationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$shoppingRecommendationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShoppingRecommendationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly passwordHash: Prisma.FieldRef<"User", 'String'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    where: Prisma.UserWhereUniqueInput;
};
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type User$profileArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserProfileSelect<ExtArgs> | null;
    omit?: Prisma.UserProfileOmit<ExtArgs> | null;
    include?: Prisma.UserProfileInclude<ExtArgs> | null;
    where?: Prisma.UserProfileWhereInput;
};
export type User$stylePreferencesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StylePreferencesSelect<ExtArgs> | null;
    omit?: Prisma.StylePreferencesOmit<ExtArgs> | null;
    include?: Prisma.StylePreferencesInclude<ExtArgs> | null;
    where?: Prisma.StylePreferencesWhereInput;
};
export type User$wardrobeItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WardrobeItemSelect<ExtArgs> | null;
    omit?: Prisma.WardrobeItemOmit<ExtArgs> | null;
    include?: Prisma.WardrobeItemInclude<ExtArgs> | null;
    where?: Prisma.WardrobeItemWhereInput;
    orderBy?: Prisma.WardrobeItemOrderByWithRelationInput | Prisma.WardrobeItemOrderByWithRelationInput[];
    cursor?: Prisma.WardrobeItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WardrobeItemScalarFieldEnum | Prisma.WardrobeItemScalarFieldEnum[];
};
export type User$outfitsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitSelect<ExtArgs> | null;
    omit?: Prisma.OutfitOmit<ExtArgs> | null;
    include?: Prisma.OutfitInclude<ExtArgs> | null;
    where?: Prisma.OutfitWhereInput;
    orderBy?: Prisma.OutfitOrderByWithRelationInput | Prisma.OutfitOrderByWithRelationInput[];
    cursor?: Prisma.OutfitWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OutfitScalarFieldEnum | Prisma.OutfitScalarFieldEnum[];
};
export type User$conversationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput | Prisma.ConversationOrderByWithRelationInput[];
    cursor?: Prisma.ConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversationScalarFieldEnum | Prisma.ConversationScalarFieldEnum[];
};
export type User$shoppingRecommendationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShoppingRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.ShoppingRecommendationOmit<ExtArgs> | null;
    include?: Prisma.ShoppingRecommendationInclude<ExtArgs> | null;
    where?: Prisma.ShoppingRecommendationWhereInput;
    orderBy?: Prisma.ShoppingRecommendationOrderByWithRelationInput | Prisma.ShoppingRecommendationOrderByWithRelationInput[];
    cursor?: Prisma.ShoppingRecommendationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShoppingRecommendationScalarFieldEnum | Prisma.ShoppingRecommendationScalarFieldEnum[];
};
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
};
