import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OutfitModel = runtime.Types.Result.DefaultSelection<Prisma.$OutfitPayload>;
export type AggregateOutfit = {
    _count: OutfitCountAggregateOutputType | null;
    _min: OutfitMinAggregateOutputType | null;
    _max: OutfitMaxAggregateOutputType | null;
};
export type OutfitMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    title: string | null;
    occasion: string | null;
    notes: string | null;
    isFavorite: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OutfitMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    title: string | null;
    occasion: string | null;
    notes: string | null;
    isFavorite: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OutfitCountAggregateOutputType = {
    id: number;
    userId: number;
    title: number;
    occasion: number;
    notes: number;
    isFavorite: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type OutfitMinAggregateInputType = {
    id?: true;
    userId?: true;
    title?: true;
    occasion?: true;
    notes?: true;
    isFavorite?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OutfitMaxAggregateInputType = {
    id?: true;
    userId?: true;
    title?: true;
    occasion?: true;
    notes?: true;
    isFavorite?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OutfitCountAggregateInputType = {
    id?: true;
    userId?: true;
    title?: true;
    occasion?: true;
    notes?: true;
    isFavorite?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type OutfitAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OutfitWhereInput;
    orderBy?: Prisma.OutfitOrderByWithRelationInput | Prisma.OutfitOrderByWithRelationInput[];
    cursor?: Prisma.OutfitWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OutfitCountAggregateInputType;
    _min?: OutfitMinAggregateInputType;
    _max?: OutfitMaxAggregateInputType;
};
export type GetOutfitAggregateType<T extends OutfitAggregateArgs> = {
    [P in keyof T & keyof AggregateOutfit]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOutfit[P]> : Prisma.GetScalarType<T[P], AggregateOutfit[P]>;
};
export type OutfitGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OutfitWhereInput;
    orderBy?: Prisma.OutfitOrderByWithAggregationInput | Prisma.OutfitOrderByWithAggregationInput[];
    by: Prisma.OutfitScalarFieldEnum[] | Prisma.OutfitScalarFieldEnum;
    having?: Prisma.OutfitScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OutfitCountAggregateInputType | true;
    _min?: OutfitMinAggregateInputType;
    _max?: OutfitMaxAggregateInputType;
};
export type OutfitGroupByOutputType = {
    id: string;
    userId: string;
    title: string;
    occasion: string | null;
    notes: string | null;
    isFavorite: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: OutfitCountAggregateOutputType | null;
    _min: OutfitMinAggregateOutputType | null;
    _max: OutfitMaxAggregateOutputType | null;
};
export type GetOutfitGroupByPayload<T extends OutfitGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OutfitGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OutfitGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OutfitGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OutfitGroupByOutputType[P]>;
}>>;
export type OutfitWhereInput = {
    AND?: Prisma.OutfitWhereInput | Prisma.OutfitWhereInput[];
    OR?: Prisma.OutfitWhereInput[];
    NOT?: Prisma.OutfitWhereInput | Prisma.OutfitWhereInput[];
    id?: Prisma.StringFilter<"Outfit"> | string;
    userId?: Prisma.StringFilter<"Outfit"> | string;
    title?: Prisma.StringFilter<"Outfit"> | string;
    occasion?: Prisma.StringNullableFilter<"Outfit"> | string | null;
    notes?: Prisma.StringNullableFilter<"Outfit"> | string | null;
    isFavorite?: Prisma.BoolFilter<"Outfit"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Outfit"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Outfit"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    outfitItems?: Prisma.OutfitItemListRelationFilter;
};
export type OutfitOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    occasion?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    isFavorite?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    outfitItems?: Prisma.OutfitItemOrderByRelationAggregateInput;
};
export type OutfitWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.OutfitWhereInput | Prisma.OutfitWhereInput[];
    OR?: Prisma.OutfitWhereInput[];
    NOT?: Prisma.OutfitWhereInput | Prisma.OutfitWhereInput[];
    userId?: Prisma.StringFilter<"Outfit"> | string;
    title?: Prisma.StringFilter<"Outfit"> | string;
    occasion?: Prisma.StringNullableFilter<"Outfit"> | string | null;
    notes?: Prisma.StringNullableFilter<"Outfit"> | string | null;
    isFavorite?: Prisma.BoolFilter<"Outfit"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Outfit"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Outfit"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    outfitItems?: Prisma.OutfitItemListRelationFilter;
}, "id">;
export type OutfitOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    occasion?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    isFavorite?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.OutfitCountOrderByAggregateInput;
    _max?: Prisma.OutfitMaxOrderByAggregateInput;
    _min?: Prisma.OutfitMinOrderByAggregateInput;
};
export type OutfitScalarWhereWithAggregatesInput = {
    AND?: Prisma.OutfitScalarWhereWithAggregatesInput | Prisma.OutfitScalarWhereWithAggregatesInput[];
    OR?: Prisma.OutfitScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OutfitScalarWhereWithAggregatesInput | Prisma.OutfitScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Outfit"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Outfit"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Outfit"> | string;
    occasion?: Prisma.StringNullableWithAggregatesFilter<"Outfit"> | string | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"Outfit"> | string | null;
    isFavorite?: Prisma.BoolWithAggregatesFilter<"Outfit"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Outfit"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Outfit"> | Date | string;
};
export type OutfitCreateInput = {
    id?: string;
    title: string;
    occasion?: string | null;
    notes?: string | null;
    isFavorite?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutOutfitsInput;
    outfitItems?: Prisma.OutfitItemCreateNestedManyWithoutOutfitInput;
};
export type OutfitUncheckedCreateInput = {
    id?: string;
    userId: string;
    title: string;
    occasion?: string | null;
    notes?: string | null;
    isFavorite?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    outfitItems?: Prisma.OutfitItemUncheckedCreateNestedManyWithoutOutfitInput;
};
export type OutfitUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    occasion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isFavorite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutOutfitsNestedInput;
    outfitItems?: Prisma.OutfitItemUpdateManyWithoutOutfitNestedInput;
};
export type OutfitUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    occasion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isFavorite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    outfitItems?: Prisma.OutfitItemUncheckedUpdateManyWithoutOutfitNestedInput;
};
export type OutfitCreateManyInput = {
    id?: string;
    userId: string;
    title: string;
    occasion?: string | null;
    notes?: string | null;
    isFavorite?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OutfitUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    occasion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isFavorite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OutfitUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    occasion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isFavorite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OutfitListRelationFilter = {
    every?: Prisma.OutfitWhereInput;
    some?: Prisma.OutfitWhereInput;
    none?: Prisma.OutfitWhereInput;
};
export type OutfitOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OutfitCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    occasion?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    isFavorite?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OutfitMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    occasion?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    isFavorite?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OutfitMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    occasion?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    isFavorite?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OutfitScalarRelationFilter = {
    is?: Prisma.OutfitWhereInput;
    isNot?: Prisma.OutfitWhereInput;
};
export type OutfitCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OutfitCreateWithoutUserInput, Prisma.OutfitUncheckedCreateWithoutUserInput> | Prisma.OutfitCreateWithoutUserInput[] | Prisma.OutfitUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OutfitCreateOrConnectWithoutUserInput | Prisma.OutfitCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OutfitCreateManyUserInputEnvelope;
    connect?: Prisma.OutfitWhereUniqueInput | Prisma.OutfitWhereUniqueInput[];
};
export type OutfitUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OutfitCreateWithoutUserInput, Prisma.OutfitUncheckedCreateWithoutUserInput> | Prisma.OutfitCreateWithoutUserInput[] | Prisma.OutfitUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OutfitCreateOrConnectWithoutUserInput | Prisma.OutfitCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OutfitCreateManyUserInputEnvelope;
    connect?: Prisma.OutfitWhereUniqueInput | Prisma.OutfitWhereUniqueInput[];
};
export type OutfitUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OutfitCreateWithoutUserInput, Prisma.OutfitUncheckedCreateWithoutUserInput> | Prisma.OutfitCreateWithoutUserInput[] | Prisma.OutfitUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OutfitCreateOrConnectWithoutUserInput | Prisma.OutfitCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OutfitUpsertWithWhereUniqueWithoutUserInput | Prisma.OutfitUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OutfitCreateManyUserInputEnvelope;
    set?: Prisma.OutfitWhereUniqueInput | Prisma.OutfitWhereUniqueInput[];
    disconnect?: Prisma.OutfitWhereUniqueInput | Prisma.OutfitWhereUniqueInput[];
    delete?: Prisma.OutfitWhereUniqueInput | Prisma.OutfitWhereUniqueInput[];
    connect?: Prisma.OutfitWhereUniqueInput | Prisma.OutfitWhereUniqueInput[];
    update?: Prisma.OutfitUpdateWithWhereUniqueWithoutUserInput | Prisma.OutfitUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OutfitUpdateManyWithWhereWithoutUserInput | Prisma.OutfitUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OutfitScalarWhereInput | Prisma.OutfitScalarWhereInput[];
};
export type OutfitUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OutfitCreateWithoutUserInput, Prisma.OutfitUncheckedCreateWithoutUserInput> | Prisma.OutfitCreateWithoutUserInput[] | Prisma.OutfitUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OutfitCreateOrConnectWithoutUserInput | Prisma.OutfitCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OutfitUpsertWithWhereUniqueWithoutUserInput | Prisma.OutfitUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OutfitCreateManyUserInputEnvelope;
    set?: Prisma.OutfitWhereUniqueInput | Prisma.OutfitWhereUniqueInput[];
    disconnect?: Prisma.OutfitWhereUniqueInput | Prisma.OutfitWhereUniqueInput[];
    delete?: Prisma.OutfitWhereUniqueInput | Prisma.OutfitWhereUniqueInput[];
    connect?: Prisma.OutfitWhereUniqueInput | Prisma.OutfitWhereUniqueInput[];
    update?: Prisma.OutfitUpdateWithWhereUniqueWithoutUserInput | Prisma.OutfitUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OutfitUpdateManyWithWhereWithoutUserInput | Prisma.OutfitUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OutfitScalarWhereInput | Prisma.OutfitScalarWhereInput[];
};
export type OutfitCreateNestedOneWithoutOutfitItemsInput = {
    create?: Prisma.XOR<Prisma.OutfitCreateWithoutOutfitItemsInput, Prisma.OutfitUncheckedCreateWithoutOutfitItemsInput>;
    connectOrCreate?: Prisma.OutfitCreateOrConnectWithoutOutfitItemsInput;
    connect?: Prisma.OutfitWhereUniqueInput;
};
export type OutfitUpdateOneRequiredWithoutOutfitItemsNestedInput = {
    create?: Prisma.XOR<Prisma.OutfitCreateWithoutOutfitItemsInput, Prisma.OutfitUncheckedCreateWithoutOutfitItemsInput>;
    connectOrCreate?: Prisma.OutfitCreateOrConnectWithoutOutfitItemsInput;
    upsert?: Prisma.OutfitUpsertWithoutOutfitItemsInput;
    connect?: Prisma.OutfitWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OutfitUpdateToOneWithWhereWithoutOutfitItemsInput, Prisma.OutfitUpdateWithoutOutfitItemsInput>, Prisma.OutfitUncheckedUpdateWithoutOutfitItemsInput>;
};
export type OutfitCreateWithoutUserInput = {
    id?: string;
    title: string;
    occasion?: string | null;
    notes?: string | null;
    isFavorite?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    outfitItems?: Prisma.OutfitItemCreateNestedManyWithoutOutfitInput;
};
export type OutfitUncheckedCreateWithoutUserInput = {
    id?: string;
    title: string;
    occasion?: string | null;
    notes?: string | null;
    isFavorite?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    outfitItems?: Prisma.OutfitItemUncheckedCreateNestedManyWithoutOutfitInput;
};
export type OutfitCreateOrConnectWithoutUserInput = {
    where: Prisma.OutfitWhereUniqueInput;
    create: Prisma.XOR<Prisma.OutfitCreateWithoutUserInput, Prisma.OutfitUncheckedCreateWithoutUserInput>;
};
export type OutfitCreateManyUserInputEnvelope = {
    data: Prisma.OutfitCreateManyUserInput | Prisma.OutfitCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type OutfitUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.OutfitWhereUniqueInput;
    update: Prisma.XOR<Prisma.OutfitUpdateWithoutUserInput, Prisma.OutfitUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.OutfitCreateWithoutUserInput, Prisma.OutfitUncheckedCreateWithoutUserInput>;
};
export type OutfitUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.OutfitWhereUniqueInput;
    data: Prisma.XOR<Prisma.OutfitUpdateWithoutUserInput, Prisma.OutfitUncheckedUpdateWithoutUserInput>;
};
export type OutfitUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.OutfitScalarWhereInput;
    data: Prisma.XOR<Prisma.OutfitUpdateManyMutationInput, Prisma.OutfitUncheckedUpdateManyWithoutUserInput>;
};
export type OutfitScalarWhereInput = {
    AND?: Prisma.OutfitScalarWhereInput | Prisma.OutfitScalarWhereInput[];
    OR?: Prisma.OutfitScalarWhereInput[];
    NOT?: Prisma.OutfitScalarWhereInput | Prisma.OutfitScalarWhereInput[];
    id?: Prisma.StringFilter<"Outfit"> | string;
    userId?: Prisma.StringFilter<"Outfit"> | string;
    title?: Prisma.StringFilter<"Outfit"> | string;
    occasion?: Prisma.StringNullableFilter<"Outfit"> | string | null;
    notes?: Prisma.StringNullableFilter<"Outfit"> | string | null;
    isFavorite?: Prisma.BoolFilter<"Outfit"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Outfit"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Outfit"> | Date | string;
};
export type OutfitCreateWithoutOutfitItemsInput = {
    id?: string;
    title: string;
    occasion?: string | null;
    notes?: string | null;
    isFavorite?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutOutfitsInput;
};
export type OutfitUncheckedCreateWithoutOutfitItemsInput = {
    id?: string;
    userId: string;
    title: string;
    occasion?: string | null;
    notes?: string | null;
    isFavorite?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OutfitCreateOrConnectWithoutOutfitItemsInput = {
    where: Prisma.OutfitWhereUniqueInput;
    create: Prisma.XOR<Prisma.OutfitCreateWithoutOutfitItemsInput, Prisma.OutfitUncheckedCreateWithoutOutfitItemsInput>;
};
export type OutfitUpsertWithoutOutfitItemsInput = {
    update: Prisma.XOR<Prisma.OutfitUpdateWithoutOutfitItemsInput, Prisma.OutfitUncheckedUpdateWithoutOutfitItemsInput>;
    create: Prisma.XOR<Prisma.OutfitCreateWithoutOutfitItemsInput, Prisma.OutfitUncheckedCreateWithoutOutfitItemsInput>;
    where?: Prisma.OutfitWhereInput;
};
export type OutfitUpdateToOneWithWhereWithoutOutfitItemsInput = {
    where?: Prisma.OutfitWhereInput;
    data: Prisma.XOR<Prisma.OutfitUpdateWithoutOutfitItemsInput, Prisma.OutfitUncheckedUpdateWithoutOutfitItemsInput>;
};
export type OutfitUpdateWithoutOutfitItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    occasion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isFavorite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutOutfitsNestedInput;
};
export type OutfitUncheckedUpdateWithoutOutfitItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    occasion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isFavorite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OutfitCreateManyUserInput = {
    id?: string;
    title: string;
    occasion?: string | null;
    notes?: string | null;
    isFavorite?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OutfitUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    occasion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isFavorite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    outfitItems?: Prisma.OutfitItemUpdateManyWithoutOutfitNestedInput;
};
export type OutfitUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    occasion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isFavorite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    outfitItems?: Prisma.OutfitItemUncheckedUpdateManyWithoutOutfitNestedInput;
};
export type OutfitUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    occasion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isFavorite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OutfitCountOutputType = {
    outfitItems: number;
};
export type OutfitCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    outfitItems?: boolean | OutfitCountOutputTypeCountOutfitItemsArgs;
};
export type OutfitCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitCountOutputTypeSelect<ExtArgs> | null;
};
export type OutfitCountOutputTypeCountOutfitItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OutfitItemWhereInput;
};
export type OutfitSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    title?: boolean;
    occasion?: boolean;
    notes?: boolean;
    isFavorite?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    outfitItems?: boolean | Prisma.Outfit$outfitItemsArgs<ExtArgs>;
    _count?: boolean | Prisma.OutfitCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["outfit"]>;
export type OutfitSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    title?: boolean;
    occasion?: boolean;
    notes?: boolean;
    isFavorite?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["outfit"]>;
export type OutfitSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    title?: boolean;
    occasion?: boolean;
    notes?: boolean;
    isFavorite?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["outfit"]>;
export type OutfitSelectScalar = {
    id?: boolean;
    userId?: boolean;
    title?: boolean;
    occasion?: boolean;
    notes?: boolean;
    isFavorite?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type OutfitOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "title" | "occasion" | "notes" | "isFavorite" | "createdAt" | "updatedAt", ExtArgs["result"]["outfit"]>;
export type OutfitInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    outfitItems?: boolean | Prisma.Outfit$outfitItemsArgs<ExtArgs>;
    _count?: boolean | Prisma.OutfitCountOutputTypeDefaultArgs<ExtArgs>;
};
export type OutfitIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type OutfitIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $OutfitPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Outfit";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        outfitItems: Prisma.$OutfitItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        title: string;
        occasion: string | null;
        notes: string | null;
        isFavorite: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["outfit"]>;
    composites: {};
};
export type OutfitGetPayload<S extends boolean | null | undefined | OutfitDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OutfitPayload, S>;
export type OutfitCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OutfitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OutfitCountAggregateInputType | true;
};
export interface OutfitDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Outfit'];
        meta: {
            name: 'Outfit';
        };
    };
    findUnique<T extends OutfitFindUniqueArgs>(args: Prisma.SelectSubset<T, OutfitFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OutfitClient<runtime.Types.Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OutfitFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OutfitFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OutfitClient<runtime.Types.Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OutfitFindFirstArgs>(args?: Prisma.SelectSubset<T, OutfitFindFirstArgs<ExtArgs>>): Prisma.Prisma__OutfitClient<runtime.Types.Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OutfitFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OutfitFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OutfitClient<runtime.Types.Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OutfitFindManyArgs>(args?: Prisma.SelectSubset<T, OutfitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OutfitCreateArgs>(args: Prisma.SelectSubset<T, OutfitCreateArgs<ExtArgs>>): Prisma.Prisma__OutfitClient<runtime.Types.Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OutfitCreateManyArgs>(args?: Prisma.SelectSubset<T, OutfitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OutfitCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OutfitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OutfitDeleteArgs>(args: Prisma.SelectSubset<T, OutfitDeleteArgs<ExtArgs>>): Prisma.Prisma__OutfitClient<runtime.Types.Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OutfitUpdateArgs>(args: Prisma.SelectSubset<T, OutfitUpdateArgs<ExtArgs>>): Prisma.Prisma__OutfitClient<runtime.Types.Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OutfitDeleteManyArgs>(args?: Prisma.SelectSubset<T, OutfitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OutfitUpdateManyArgs>(args: Prisma.SelectSubset<T, OutfitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OutfitUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OutfitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OutfitUpsertArgs>(args: Prisma.SelectSubset<T, OutfitUpsertArgs<ExtArgs>>): Prisma.Prisma__OutfitClient<runtime.Types.Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OutfitCountArgs>(args?: Prisma.Subset<T, OutfitCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OutfitCountAggregateOutputType> : number>;
    aggregate<T extends OutfitAggregateArgs>(args: Prisma.Subset<T, OutfitAggregateArgs>): Prisma.PrismaPromise<GetOutfitAggregateType<T>>;
    groupBy<T extends OutfitGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OutfitGroupByArgs['orderBy'];
    } : {
        orderBy?: OutfitGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OutfitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutfitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OutfitFieldRefs;
}
export interface Prisma__OutfitClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    outfitItems<T extends Prisma.Outfit$outfitItemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Outfit$outfitItemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OutfitFieldRefs {
    readonly id: Prisma.FieldRef<"Outfit", 'String'>;
    readonly userId: Prisma.FieldRef<"Outfit", 'String'>;
    readonly title: Prisma.FieldRef<"Outfit", 'String'>;
    readonly occasion: Prisma.FieldRef<"Outfit", 'String'>;
    readonly notes: Prisma.FieldRef<"Outfit", 'String'>;
    readonly isFavorite: Prisma.FieldRef<"Outfit", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Outfit", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Outfit", 'DateTime'>;
}
export type OutfitFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitSelect<ExtArgs> | null;
    omit?: Prisma.OutfitOmit<ExtArgs> | null;
    include?: Prisma.OutfitInclude<ExtArgs> | null;
    where: Prisma.OutfitWhereUniqueInput;
};
export type OutfitFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitSelect<ExtArgs> | null;
    omit?: Prisma.OutfitOmit<ExtArgs> | null;
    include?: Prisma.OutfitInclude<ExtArgs> | null;
    where: Prisma.OutfitWhereUniqueInput;
};
export type OutfitFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OutfitFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OutfitFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OutfitCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitSelect<ExtArgs> | null;
    omit?: Prisma.OutfitOmit<ExtArgs> | null;
    include?: Prisma.OutfitInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OutfitCreateInput, Prisma.OutfitUncheckedCreateInput>;
};
export type OutfitCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OutfitCreateManyInput | Prisma.OutfitCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OutfitCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OutfitOmit<ExtArgs> | null;
    data: Prisma.OutfitCreateManyInput | Prisma.OutfitCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OutfitIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OutfitUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitSelect<ExtArgs> | null;
    omit?: Prisma.OutfitOmit<ExtArgs> | null;
    include?: Prisma.OutfitInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OutfitUpdateInput, Prisma.OutfitUncheckedUpdateInput>;
    where: Prisma.OutfitWhereUniqueInput;
};
export type OutfitUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OutfitUpdateManyMutationInput, Prisma.OutfitUncheckedUpdateManyInput>;
    where?: Prisma.OutfitWhereInput;
    limit?: number;
};
export type OutfitUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OutfitOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OutfitUpdateManyMutationInput, Prisma.OutfitUncheckedUpdateManyInput>;
    where?: Prisma.OutfitWhereInput;
    limit?: number;
    include?: Prisma.OutfitIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OutfitUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitSelect<ExtArgs> | null;
    omit?: Prisma.OutfitOmit<ExtArgs> | null;
    include?: Prisma.OutfitInclude<ExtArgs> | null;
    where: Prisma.OutfitWhereUniqueInput;
    create: Prisma.XOR<Prisma.OutfitCreateInput, Prisma.OutfitUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OutfitUpdateInput, Prisma.OutfitUncheckedUpdateInput>;
};
export type OutfitDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitSelect<ExtArgs> | null;
    omit?: Prisma.OutfitOmit<ExtArgs> | null;
    include?: Prisma.OutfitInclude<ExtArgs> | null;
    where: Prisma.OutfitWhereUniqueInput;
};
export type OutfitDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OutfitWhereInput;
    limit?: number;
};
export type Outfit$outfitItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitItemSelect<ExtArgs> | null;
    omit?: Prisma.OutfitItemOmit<ExtArgs> | null;
    include?: Prisma.OutfitItemInclude<ExtArgs> | null;
    where?: Prisma.OutfitItemWhereInput;
    orderBy?: Prisma.OutfitItemOrderByWithRelationInput | Prisma.OutfitItemOrderByWithRelationInput[];
    cursor?: Prisma.OutfitItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OutfitItemScalarFieldEnum | Prisma.OutfitItemScalarFieldEnum[];
};
export type OutfitDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitSelect<ExtArgs> | null;
    omit?: Prisma.OutfitOmit<ExtArgs> | null;
    include?: Prisma.OutfitInclude<ExtArgs> | null;
};
