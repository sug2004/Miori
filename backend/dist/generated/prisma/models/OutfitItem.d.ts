import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OutfitItemModel = runtime.Types.Result.DefaultSelection<Prisma.$OutfitItemPayload>;
export type AggregateOutfitItem = {
    _count: OutfitItemCountAggregateOutputType | null;
    _avg: OutfitItemAvgAggregateOutputType | null;
    _sum: OutfitItemSumAggregateOutputType | null;
    _min: OutfitItemMinAggregateOutputType | null;
    _max: OutfitItemMaxAggregateOutputType | null;
};
export type OutfitItemAvgAggregateOutputType = {
    position: number | null;
};
export type OutfitItemSumAggregateOutputType = {
    position: number | null;
};
export type OutfitItemMinAggregateOutputType = {
    id: string | null;
    outfitId: string | null;
    wardrobeItemId: string | null;
    position: number | null;
};
export type OutfitItemMaxAggregateOutputType = {
    id: string | null;
    outfitId: string | null;
    wardrobeItemId: string | null;
    position: number | null;
};
export type OutfitItemCountAggregateOutputType = {
    id: number;
    outfitId: number;
    wardrobeItemId: number;
    position: number;
    _all: number;
};
export type OutfitItemAvgAggregateInputType = {
    position?: true;
};
export type OutfitItemSumAggregateInputType = {
    position?: true;
};
export type OutfitItemMinAggregateInputType = {
    id?: true;
    outfitId?: true;
    wardrobeItemId?: true;
    position?: true;
};
export type OutfitItemMaxAggregateInputType = {
    id?: true;
    outfitId?: true;
    wardrobeItemId?: true;
    position?: true;
};
export type OutfitItemCountAggregateInputType = {
    id?: true;
    outfitId?: true;
    wardrobeItemId?: true;
    position?: true;
    _all?: true;
};
export type OutfitItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OutfitItemWhereInput;
    orderBy?: Prisma.OutfitItemOrderByWithRelationInput | Prisma.OutfitItemOrderByWithRelationInput[];
    cursor?: Prisma.OutfitItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OutfitItemCountAggregateInputType;
    _avg?: OutfitItemAvgAggregateInputType;
    _sum?: OutfitItemSumAggregateInputType;
    _min?: OutfitItemMinAggregateInputType;
    _max?: OutfitItemMaxAggregateInputType;
};
export type GetOutfitItemAggregateType<T extends OutfitItemAggregateArgs> = {
    [P in keyof T & keyof AggregateOutfitItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOutfitItem[P]> : Prisma.GetScalarType<T[P], AggregateOutfitItem[P]>;
};
export type OutfitItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OutfitItemWhereInput;
    orderBy?: Prisma.OutfitItemOrderByWithAggregationInput | Prisma.OutfitItemOrderByWithAggregationInput[];
    by: Prisma.OutfitItemScalarFieldEnum[] | Prisma.OutfitItemScalarFieldEnum;
    having?: Prisma.OutfitItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OutfitItemCountAggregateInputType | true;
    _avg?: OutfitItemAvgAggregateInputType;
    _sum?: OutfitItemSumAggregateInputType;
    _min?: OutfitItemMinAggregateInputType;
    _max?: OutfitItemMaxAggregateInputType;
};
export type OutfitItemGroupByOutputType = {
    id: string;
    outfitId: string;
    wardrobeItemId: string;
    position: number;
    _count: OutfitItemCountAggregateOutputType | null;
    _avg: OutfitItemAvgAggregateOutputType | null;
    _sum: OutfitItemSumAggregateOutputType | null;
    _min: OutfitItemMinAggregateOutputType | null;
    _max: OutfitItemMaxAggregateOutputType | null;
};
export type GetOutfitItemGroupByPayload<T extends OutfitItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OutfitItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OutfitItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OutfitItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OutfitItemGroupByOutputType[P]>;
}>>;
export type OutfitItemWhereInput = {
    AND?: Prisma.OutfitItemWhereInput | Prisma.OutfitItemWhereInput[];
    OR?: Prisma.OutfitItemWhereInput[];
    NOT?: Prisma.OutfitItemWhereInput | Prisma.OutfitItemWhereInput[];
    id?: Prisma.StringFilter<"OutfitItem"> | string;
    outfitId?: Prisma.StringFilter<"OutfitItem"> | string;
    wardrobeItemId?: Prisma.StringFilter<"OutfitItem"> | string;
    position?: Prisma.IntFilter<"OutfitItem"> | number;
    outfit?: Prisma.XOR<Prisma.OutfitScalarRelationFilter, Prisma.OutfitWhereInput>;
    wardrobeItem?: Prisma.XOR<Prisma.WardrobeItemScalarRelationFilter, Prisma.WardrobeItemWhereInput>;
};
export type OutfitItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    outfitId?: Prisma.SortOrder;
    wardrobeItemId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    outfit?: Prisma.OutfitOrderByWithRelationInput;
    wardrobeItem?: Prisma.WardrobeItemOrderByWithRelationInput;
};
export type OutfitItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    outfitId_wardrobeItemId?: Prisma.OutfitItemOutfitIdWardrobeItemIdCompoundUniqueInput;
    AND?: Prisma.OutfitItemWhereInput | Prisma.OutfitItemWhereInput[];
    OR?: Prisma.OutfitItemWhereInput[];
    NOT?: Prisma.OutfitItemWhereInput | Prisma.OutfitItemWhereInput[];
    outfitId?: Prisma.StringFilter<"OutfitItem"> | string;
    wardrobeItemId?: Prisma.StringFilter<"OutfitItem"> | string;
    position?: Prisma.IntFilter<"OutfitItem"> | number;
    outfit?: Prisma.XOR<Prisma.OutfitScalarRelationFilter, Prisma.OutfitWhereInput>;
    wardrobeItem?: Prisma.XOR<Prisma.WardrobeItemScalarRelationFilter, Prisma.WardrobeItemWhereInput>;
}, "id" | "outfitId_wardrobeItemId">;
export type OutfitItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    outfitId?: Prisma.SortOrder;
    wardrobeItemId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    _count?: Prisma.OutfitItemCountOrderByAggregateInput;
    _avg?: Prisma.OutfitItemAvgOrderByAggregateInput;
    _max?: Prisma.OutfitItemMaxOrderByAggregateInput;
    _min?: Prisma.OutfitItemMinOrderByAggregateInput;
    _sum?: Prisma.OutfitItemSumOrderByAggregateInput;
};
export type OutfitItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.OutfitItemScalarWhereWithAggregatesInput | Prisma.OutfitItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.OutfitItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OutfitItemScalarWhereWithAggregatesInput | Prisma.OutfitItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"OutfitItem"> | string;
    outfitId?: Prisma.StringWithAggregatesFilter<"OutfitItem"> | string;
    wardrobeItemId?: Prisma.StringWithAggregatesFilter<"OutfitItem"> | string;
    position?: Prisma.IntWithAggregatesFilter<"OutfitItem"> | number;
};
export type OutfitItemCreateInput = {
    id?: string;
    position?: number;
    outfit: Prisma.OutfitCreateNestedOneWithoutOutfitItemsInput;
    wardrobeItem: Prisma.WardrobeItemCreateNestedOneWithoutOutfitItemsInput;
};
export type OutfitItemUncheckedCreateInput = {
    id?: string;
    outfitId: string;
    wardrobeItemId: string;
    position?: number;
};
export type OutfitItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    outfit?: Prisma.OutfitUpdateOneRequiredWithoutOutfitItemsNestedInput;
    wardrobeItem?: Prisma.WardrobeItemUpdateOneRequiredWithoutOutfitItemsNestedInput;
};
export type OutfitItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    outfitId?: Prisma.StringFieldUpdateOperationsInput | string;
    wardrobeItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OutfitItemCreateManyInput = {
    id?: string;
    outfitId: string;
    wardrobeItemId: string;
    position?: number;
};
export type OutfitItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OutfitItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    outfitId?: Prisma.StringFieldUpdateOperationsInput | string;
    wardrobeItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OutfitItemListRelationFilter = {
    every?: Prisma.OutfitItemWhereInput;
    some?: Prisma.OutfitItemWhereInput;
    none?: Prisma.OutfitItemWhereInput;
};
export type OutfitItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OutfitItemOutfitIdWardrobeItemIdCompoundUniqueInput = {
    outfitId: string;
    wardrobeItemId: string;
};
export type OutfitItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    outfitId?: Prisma.SortOrder;
    wardrobeItemId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type OutfitItemAvgOrderByAggregateInput = {
    position?: Prisma.SortOrder;
};
export type OutfitItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    outfitId?: Prisma.SortOrder;
    wardrobeItemId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type OutfitItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    outfitId?: Prisma.SortOrder;
    wardrobeItemId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type OutfitItemSumOrderByAggregateInput = {
    position?: Prisma.SortOrder;
};
export type OutfitItemCreateNestedManyWithoutWardrobeItemInput = {
    create?: Prisma.XOR<Prisma.OutfitItemCreateWithoutWardrobeItemInput, Prisma.OutfitItemUncheckedCreateWithoutWardrobeItemInput> | Prisma.OutfitItemCreateWithoutWardrobeItemInput[] | Prisma.OutfitItemUncheckedCreateWithoutWardrobeItemInput[];
    connectOrCreate?: Prisma.OutfitItemCreateOrConnectWithoutWardrobeItemInput | Prisma.OutfitItemCreateOrConnectWithoutWardrobeItemInput[];
    createMany?: Prisma.OutfitItemCreateManyWardrobeItemInputEnvelope;
    connect?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
};
export type OutfitItemUncheckedCreateNestedManyWithoutWardrobeItemInput = {
    create?: Prisma.XOR<Prisma.OutfitItemCreateWithoutWardrobeItemInput, Prisma.OutfitItemUncheckedCreateWithoutWardrobeItemInput> | Prisma.OutfitItemCreateWithoutWardrobeItemInput[] | Prisma.OutfitItemUncheckedCreateWithoutWardrobeItemInput[];
    connectOrCreate?: Prisma.OutfitItemCreateOrConnectWithoutWardrobeItemInput | Prisma.OutfitItemCreateOrConnectWithoutWardrobeItemInput[];
    createMany?: Prisma.OutfitItemCreateManyWardrobeItemInputEnvelope;
    connect?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
};
export type OutfitItemUpdateManyWithoutWardrobeItemNestedInput = {
    create?: Prisma.XOR<Prisma.OutfitItemCreateWithoutWardrobeItemInput, Prisma.OutfitItemUncheckedCreateWithoutWardrobeItemInput> | Prisma.OutfitItemCreateWithoutWardrobeItemInput[] | Prisma.OutfitItemUncheckedCreateWithoutWardrobeItemInput[];
    connectOrCreate?: Prisma.OutfitItemCreateOrConnectWithoutWardrobeItemInput | Prisma.OutfitItemCreateOrConnectWithoutWardrobeItemInput[];
    upsert?: Prisma.OutfitItemUpsertWithWhereUniqueWithoutWardrobeItemInput | Prisma.OutfitItemUpsertWithWhereUniqueWithoutWardrobeItemInput[];
    createMany?: Prisma.OutfitItemCreateManyWardrobeItemInputEnvelope;
    set?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
    disconnect?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
    delete?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
    connect?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
    update?: Prisma.OutfitItemUpdateWithWhereUniqueWithoutWardrobeItemInput | Prisma.OutfitItemUpdateWithWhereUniqueWithoutWardrobeItemInput[];
    updateMany?: Prisma.OutfitItemUpdateManyWithWhereWithoutWardrobeItemInput | Prisma.OutfitItemUpdateManyWithWhereWithoutWardrobeItemInput[];
    deleteMany?: Prisma.OutfitItemScalarWhereInput | Prisma.OutfitItemScalarWhereInput[];
};
export type OutfitItemUncheckedUpdateManyWithoutWardrobeItemNestedInput = {
    create?: Prisma.XOR<Prisma.OutfitItemCreateWithoutWardrobeItemInput, Prisma.OutfitItemUncheckedCreateWithoutWardrobeItemInput> | Prisma.OutfitItemCreateWithoutWardrobeItemInput[] | Prisma.OutfitItemUncheckedCreateWithoutWardrobeItemInput[];
    connectOrCreate?: Prisma.OutfitItemCreateOrConnectWithoutWardrobeItemInput | Prisma.OutfitItemCreateOrConnectWithoutWardrobeItemInput[];
    upsert?: Prisma.OutfitItemUpsertWithWhereUniqueWithoutWardrobeItemInput | Prisma.OutfitItemUpsertWithWhereUniqueWithoutWardrobeItemInput[];
    createMany?: Prisma.OutfitItemCreateManyWardrobeItemInputEnvelope;
    set?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
    disconnect?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
    delete?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
    connect?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
    update?: Prisma.OutfitItemUpdateWithWhereUniqueWithoutWardrobeItemInput | Prisma.OutfitItemUpdateWithWhereUniqueWithoutWardrobeItemInput[];
    updateMany?: Prisma.OutfitItemUpdateManyWithWhereWithoutWardrobeItemInput | Prisma.OutfitItemUpdateManyWithWhereWithoutWardrobeItemInput[];
    deleteMany?: Prisma.OutfitItemScalarWhereInput | Prisma.OutfitItemScalarWhereInput[];
};
export type OutfitItemCreateNestedManyWithoutOutfitInput = {
    create?: Prisma.XOR<Prisma.OutfitItemCreateWithoutOutfitInput, Prisma.OutfitItemUncheckedCreateWithoutOutfitInput> | Prisma.OutfitItemCreateWithoutOutfitInput[] | Prisma.OutfitItemUncheckedCreateWithoutOutfitInput[];
    connectOrCreate?: Prisma.OutfitItemCreateOrConnectWithoutOutfitInput | Prisma.OutfitItemCreateOrConnectWithoutOutfitInput[];
    createMany?: Prisma.OutfitItemCreateManyOutfitInputEnvelope;
    connect?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
};
export type OutfitItemUncheckedCreateNestedManyWithoutOutfitInput = {
    create?: Prisma.XOR<Prisma.OutfitItemCreateWithoutOutfitInput, Prisma.OutfitItemUncheckedCreateWithoutOutfitInput> | Prisma.OutfitItemCreateWithoutOutfitInput[] | Prisma.OutfitItemUncheckedCreateWithoutOutfitInput[];
    connectOrCreate?: Prisma.OutfitItemCreateOrConnectWithoutOutfitInput | Prisma.OutfitItemCreateOrConnectWithoutOutfitInput[];
    createMany?: Prisma.OutfitItemCreateManyOutfitInputEnvelope;
    connect?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
};
export type OutfitItemUpdateManyWithoutOutfitNestedInput = {
    create?: Prisma.XOR<Prisma.OutfitItemCreateWithoutOutfitInput, Prisma.OutfitItemUncheckedCreateWithoutOutfitInput> | Prisma.OutfitItemCreateWithoutOutfitInput[] | Prisma.OutfitItemUncheckedCreateWithoutOutfitInput[];
    connectOrCreate?: Prisma.OutfitItemCreateOrConnectWithoutOutfitInput | Prisma.OutfitItemCreateOrConnectWithoutOutfitInput[];
    upsert?: Prisma.OutfitItemUpsertWithWhereUniqueWithoutOutfitInput | Prisma.OutfitItemUpsertWithWhereUniqueWithoutOutfitInput[];
    createMany?: Prisma.OutfitItemCreateManyOutfitInputEnvelope;
    set?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
    disconnect?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
    delete?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
    connect?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
    update?: Prisma.OutfitItemUpdateWithWhereUniqueWithoutOutfitInput | Prisma.OutfitItemUpdateWithWhereUniqueWithoutOutfitInput[];
    updateMany?: Prisma.OutfitItemUpdateManyWithWhereWithoutOutfitInput | Prisma.OutfitItemUpdateManyWithWhereWithoutOutfitInput[];
    deleteMany?: Prisma.OutfitItemScalarWhereInput | Prisma.OutfitItemScalarWhereInput[];
};
export type OutfitItemUncheckedUpdateManyWithoutOutfitNestedInput = {
    create?: Prisma.XOR<Prisma.OutfitItemCreateWithoutOutfitInput, Prisma.OutfitItemUncheckedCreateWithoutOutfitInput> | Prisma.OutfitItemCreateWithoutOutfitInput[] | Prisma.OutfitItemUncheckedCreateWithoutOutfitInput[];
    connectOrCreate?: Prisma.OutfitItemCreateOrConnectWithoutOutfitInput | Prisma.OutfitItemCreateOrConnectWithoutOutfitInput[];
    upsert?: Prisma.OutfitItemUpsertWithWhereUniqueWithoutOutfitInput | Prisma.OutfitItemUpsertWithWhereUniqueWithoutOutfitInput[];
    createMany?: Prisma.OutfitItemCreateManyOutfitInputEnvelope;
    set?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
    disconnect?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
    delete?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
    connect?: Prisma.OutfitItemWhereUniqueInput | Prisma.OutfitItemWhereUniqueInput[];
    update?: Prisma.OutfitItemUpdateWithWhereUniqueWithoutOutfitInput | Prisma.OutfitItemUpdateWithWhereUniqueWithoutOutfitInput[];
    updateMany?: Prisma.OutfitItemUpdateManyWithWhereWithoutOutfitInput | Prisma.OutfitItemUpdateManyWithWhereWithoutOutfitInput[];
    deleteMany?: Prisma.OutfitItemScalarWhereInput | Prisma.OutfitItemScalarWhereInput[];
};
export type OutfitItemCreateWithoutWardrobeItemInput = {
    id?: string;
    position?: number;
    outfit: Prisma.OutfitCreateNestedOneWithoutOutfitItemsInput;
};
export type OutfitItemUncheckedCreateWithoutWardrobeItemInput = {
    id?: string;
    outfitId: string;
    position?: number;
};
export type OutfitItemCreateOrConnectWithoutWardrobeItemInput = {
    where: Prisma.OutfitItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.OutfitItemCreateWithoutWardrobeItemInput, Prisma.OutfitItemUncheckedCreateWithoutWardrobeItemInput>;
};
export type OutfitItemCreateManyWardrobeItemInputEnvelope = {
    data: Prisma.OutfitItemCreateManyWardrobeItemInput | Prisma.OutfitItemCreateManyWardrobeItemInput[];
    skipDuplicates?: boolean;
};
export type OutfitItemUpsertWithWhereUniqueWithoutWardrobeItemInput = {
    where: Prisma.OutfitItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.OutfitItemUpdateWithoutWardrobeItemInput, Prisma.OutfitItemUncheckedUpdateWithoutWardrobeItemInput>;
    create: Prisma.XOR<Prisma.OutfitItemCreateWithoutWardrobeItemInput, Prisma.OutfitItemUncheckedCreateWithoutWardrobeItemInput>;
};
export type OutfitItemUpdateWithWhereUniqueWithoutWardrobeItemInput = {
    where: Prisma.OutfitItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.OutfitItemUpdateWithoutWardrobeItemInput, Prisma.OutfitItemUncheckedUpdateWithoutWardrobeItemInput>;
};
export type OutfitItemUpdateManyWithWhereWithoutWardrobeItemInput = {
    where: Prisma.OutfitItemScalarWhereInput;
    data: Prisma.XOR<Prisma.OutfitItemUpdateManyMutationInput, Prisma.OutfitItemUncheckedUpdateManyWithoutWardrobeItemInput>;
};
export type OutfitItemScalarWhereInput = {
    AND?: Prisma.OutfitItemScalarWhereInput | Prisma.OutfitItemScalarWhereInput[];
    OR?: Prisma.OutfitItemScalarWhereInput[];
    NOT?: Prisma.OutfitItemScalarWhereInput | Prisma.OutfitItemScalarWhereInput[];
    id?: Prisma.StringFilter<"OutfitItem"> | string;
    outfitId?: Prisma.StringFilter<"OutfitItem"> | string;
    wardrobeItemId?: Prisma.StringFilter<"OutfitItem"> | string;
    position?: Prisma.IntFilter<"OutfitItem"> | number;
};
export type OutfitItemCreateWithoutOutfitInput = {
    id?: string;
    position?: number;
    wardrobeItem: Prisma.WardrobeItemCreateNestedOneWithoutOutfitItemsInput;
};
export type OutfitItemUncheckedCreateWithoutOutfitInput = {
    id?: string;
    wardrobeItemId: string;
    position?: number;
};
export type OutfitItemCreateOrConnectWithoutOutfitInput = {
    where: Prisma.OutfitItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.OutfitItemCreateWithoutOutfitInput, Prisma.OutfitItemUncheckedCreateWithoutOutfitInput>;
};
export type OutfitItemCreateManyOutfitInputEnvelope = {
    data: Prisma.OutfitItemCreateManyOutfitInput | Prisma.OutfitItemCreateManyOutfitInput[];
    skipDuplicates?: boolean;
};
export type OutfitItemUpsertWithWhereUniqueWithoutOutfitInput = {
    where: Prisma.OutfitItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.OutfitItemUpdateWithoutOutfitInput, Prisma.OutfitItemUncheckedUpdateWithoutOutfitInput>;
    create: Prisma.XOR<Prisma.OutfitItemCreateWithoutOutfitInput, Prisma.OutfitItemUncheckedCreateWithoutOutfitInput>;
};
export type OutfitItemUpdateWithWhereUniqueWithoutOutfitInput = {
    where: Prisma.OutfitItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.OutfitItemUpdateWithoutOutfitInput, Prisma.OutfitItemUncheckedUpdateWithoutOutfitInput>;
};
export type OutfitItemUpdateManyWithWhereWithoutOutfitInput = {
    where: Prisma.OutfitItemScalarWhereInput;
    data: Prisma.XOR<Prisma.OutfitItemUpdateManyMutationInput, Prisma.OutfitItemUncheckedUpdateManyWithoutOutfitInput>;
};
export type OutfitItemCreateManyWardrobeItemInput = {
    id?: string;
    outfitId: string;
    position?: number;
};
export type OutfitItemUpdateWithoutWardrobeItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    outfit?: Prisma.OutfitUpdateOneRequiredWithoutOutfitItemsNestedInput;
};
export type OutfitItemUncheckedUpdateWithoutWardrobeItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    outfitId?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OutfitItemUncheckedUpdateManyWithoutWardrobeItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    outfitId?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OutfitItemCreateManyOutfitInput = {
    id?: string;
    wardrobeItemId: string;
    position?: number;
};
export type OutfitItemUpdateWithoutOutfitInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    wardrobeItem?: Prisma.WardrobeItemUpdateOneRequiredWithoutOutfitItemsNestedInput;
};
export type OutfitItemUncheckedUpdateWithoutOutfitInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    wardrobeItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OutfitItemUncheckedUpdateManyWithoutOutfitInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    wardrobeItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OutfitItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    outfitId?: boolean;
    wardrobeItemId?: boolean;
    position?: boolean;
    outfit?: boolean | Prisma.OutfitDefaultArgs<ExtArgs>;
    wardrobeItem?: boolean | Prisma.WardrobeItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["outfitItem"]>;
export type OutfitItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    outfitId?: boolean;
    wardrobeItemId?: boolean;
    position?: boolean;
    outfit?: boolean | Prisma.OutfitDefaultArgs<ExtArgs>;
    wardrobeItem?: boolean | Prisma.WardrobeItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["outfitItem"]>;
export type OutfitItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    outfitId?: boolean;
    wardrobeItemId?: boolean;
    position?: boolean;
    outfit?: boolean | Prisma.OutfitDefaultArgs<ExtArgs>;
    wardrobeItem?: boolean | Prisma.WardrobeItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["outfitItem"]>;
export type OutfitItemSelectScalar = {
    id?: boolean;
    outfitId?: boolean;
    wardrobeItemId?: boolean;
    position?: boolean;
};
export type OutfitItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "outfitId" | "wardrobeItemId" | "position", ExtArgs["result"]["outfitItem"]>;
export type OutfitItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    outfit?: boolean | Prisma.OutfitDefaultArgs<ExtArgs>;
    wardrobeItem?: boolean | Prisma.WardrobeItemDefaultArgs<ExtArgs>;
};
export type OutfitItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    outfit?: boolean | Prisma.OutfitDefaultArgs<ExtArgs>;
    wardrobeItem?: boolean | Prisma.WardrobeItemDefaultArgs<ExtArgs>;
};
export type OutfitItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    outfit?: boolean | Prisma.OutfitDefaultArgs<ExtArgs>;
    wardrobeItem?: boolean | Prisma.WardrobeItemDefaultArgs<ExtArgs>;
};
export type $OutfitItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OutfitItem";
    objects: {
        outfit: Prisma.$OutfitPayload<ExtArgs>;
        wardrobeItem: Prisma.$WardrobeItemPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        outfitId: string;
        wardrobeItemId: string;
        position: number;
    }, ExtArgs["result"]["outfitItem"]>;
    composites: {};
};
export type OutfitItemGetPayload<S extends boolean | null | undefined | OutfitItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OutfitItemPayload, S>;
export type OutfitItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OutfitItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OutfitItemCountAggregateInputType | true;
};
export interface OutfitItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OutfitItem'];
        meta: {
            name: 'OutfitItem';
        };
    };
    findUnique<T extends OutfitItemFindUniqueArgs>(args: Prisma.SelectSubset<T, OutfitItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OutfitItemClient<runtime.Types.Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OutfitItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OutfitItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OutfitItemClient<runtime.Types.Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OutfitItemFindFirstArgs>(args?: Prisma.SelectSubset<T, OutfitItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__OutfitItemClient<runtime.Types.Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OutfitItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OutfitItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OutfitItemClient<runtime.Types.Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OutfitItemFindManyArgs>(args?: Prisma.SelectSubset<T, OutfitItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OutfitItemCreateArgs>(args: Prisma.SelectSubset<T, OutfitItemCreateArgs<ExtArgs>>): Prisma.Prisma__OutfitItemClient<runtime.Types.Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OutfitItemCreateManyArgs>(args?: Prisma.SelectSubset<T, OutfitItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OutfitItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OutfitItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OutfitItemDeleteArgs>(args: Prisma.SelectSubset<T, OutfitItemDeleteArgs<ExtArgs>>): Prisma.Prisma__OutfitItemClient<runtime.Types.Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OutfitItemUpdateArgs>(args: Prisma.SelectSubset<T, OutfitItemUpdateArgs<ExtArgs>>): Prisma.Prisma__OutfitItemClient<runtime.Types.Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OutfitItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, OutfitItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OutfitItemUpdateManyArgs>(args: Prisma.SelectSubset<T, OutfitItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OutfitItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OutfitItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OutfitItemUpsertArgs>(args: Prisma.SelectSubset<T, OutfitItemUpsertArgs<ExtArgs>>): Prisma.Prisma__OutfitItemClient<runtime.Types.Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OutfitItemCountArgs>(args?: Prisma.Subset<T, OutfitItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OutfitItemCountAggregateOutputType> : number>;
    aggregate<T extends OutfitItemAggregateArgs>(args: Prisma.Subset<T, OutfitItemAggregateArgs>): Prisma.PrismaPromise<GetOutfitItemAggregateType<T>>;
    groupBy<T extends OutfitItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OutfitItemGroupByArgs['orderBy'];
    } : {
        orderBy?: OutfitItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OutfitItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutfitItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OutfitItemFieldRefs;
}
export interface Prisma__OutfitItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    outfit<T extends Prisma.OutfitDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OutfitDefaultArgs<ExtArgs>>): Prisma.Prisma__OutfitClient<runtime.Types.Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    wardrobeItem<T extends Prisma.WardrobeItemDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WardrobeItemDefaultArgs<ExtArgs>>): Prisma.Prisma__WardrobeItemClient<runtime.Types.Result.GetResult<Prisma.$WardrobeItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OutfitItemFieldRefs {
    readonly id: Prisma.FieldRef<"OutfitItem", 'String'>;
    readonly outfitId: Prisma.FieldRef<"OutfitItem", 'String'>;
    readonly wardrobeItemId: Prisma.FieldRef<"OutfitItem", 'String'>;
    readonly position: Prisma.FieldRef<"OutfitItem", 'Int'>;
}
export type OutfitItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitItemSelect<ExtArgs> | null;
    omit?: Prisma.OutfitItemOmit<ExtArgs> | null;
    include?: Prisma.OutfitItemInclude<ExtArgs> | null;
    where: Prisma.OutfitItemWhereUniqueInput;
};
export type OutfitItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitItemSelect<ExtArgs> | null;
    omit?: Prisma.OutfitItemOmit<ExtArgs> | null;
    include?: Prisma.OutfitItemInclude<ExtArgs> | null;
    where: Prisma.OutfitItemWhereUniqueInput;
};
export type OutfitItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OutfitItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OutfitItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OutfitItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitItemSelect<ExtArgs> | null;
    omit?: Prisma.OutfitItemOmit<ExtArgs> | null;
    include?: Prisma.OutfitItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OutfitItemCreateInput, Prisma.OutfitItemUncheckedCreateInput>;
};
export type OutfitItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OutfitItemCreateManyInput | Prisma.OutfitItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OutfitItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OutfitItemOmit<ExtArgs> | null;
    data: Prisma.OutfitItemCreateManyInput | Prisma.OutfitItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OutfitItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OutfitItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitItemSelect<ExtArgs> | null;
    omit?: Prisma.OutfitItemOmit<ExtArgs> | null;
    include?: Prisma.OutfitItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OutfitItemUpdateInput, Prisma.OutfitItemUncheckedUpdateInput>;
    where: Prisma.OutfitItemWhereUniqueInput;
};
export type OutfitItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OutfitItemUpdateManyMutationInput, Prisma.OutfitItemUncheckedUpdateManyInput>;
    where?: Prisma.OutfitItemWhereInput;
    limit?: number;
};
export type OutfitItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OutfitItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OutfitItemUpdateManyMutationInput, Prisma.OutfitItemUncheckedUpdateManyInput>;
    where?: Prisma.OutfitItemWhereInput;
    limit?: number;
    include?: Prisma.OutfitItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OutfitItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitItemSelect<ExtArgs> | null;
    omit?: Prisma.OutfitItemOmit<ExtArgs> | null;
    include?: Prisma.OutfitItemInclude<ExtArgs> | null;
    where: Prisma.OutfitItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.OutfitItemCreateInput, Prisma.OutfitItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OutfitItemUpdateInput, Prisma.OutfitItemUncheckedUpdateInput>;
};
export type OutfitItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitItemSelect<ExtArgs> | null;
    omit?: Prisma.OutfitItemOmit<ExtArgs> | null;
    include?: Prisma.OutfitItemInclude<ExtArgs> | null;
    where: Prisma.OutfitItemWhereUniqueInput;
};
export type OutfitItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OutfitItemWhereInput;
    limit?: number;
};
export type OutfitItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutfitItemSelect<ExtArgs> | null;
    omit?: Prisma.OutfitItemOmit<ExtArgs> | null;
    include?: Prisma.OutfitItemInclude<ExtArgs> | null;
};
