import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ShoppingRecommendationModel = runtime.Types.Result.DefaultSelection<Prisma.$ShoppingRecommendationPayload>;
export type AggregateShoppingRecommendation = {
    _count: ShoppingRecommendationCountAggregateOutputType | null;
    _avg: ShoppingRecommendationAvgAggregateOutputType | null;
    _sum: ShoppingRecommendationSumAggregateOutputType | null;
    _min: ShoppingRecommendationMinAggregateOutputType | null;
    _max: ShoppingRecommendationMaxAggregateOutputType | null;
};
export type ShoppingRecommendationAvgAggregateOutputType = {
    price: runtime.Decimal | null;
};
export type ShoppingRecommendationSumAggregateOutputType = {
    price: runtime.Decimal | null;
};
export type ShoppingRecommendationMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    category: string | null;
    title: string | null;
    description: string | null;
    reason: string | null;
    productUrl: string | null;
    imageUrl: string | null;
    price: runtime.Decimal | null;
    source: string | null;
    createdAt: Date | null;
};
export type ShoppingRecommendationMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    category: string | null;
    title: string | null;
    description: string | null;
    reason: string | null;
    productUrl: string | null;
    imageUrl: string | null;
    price: runtime.Decimal | null;
    source: string | null;
    createdAt: Date | null;
};
export type ShoppingRecommendationCountAggregateOutputType = {
    id: number;
    userId: number;
    category: number;
    title: number;
    description: number;
    reason: number;
    productUrl: number;
    imageUrl: number;
    price: number;
    source: number;
    createdAt: number;
    _all: number;
};
export type ShoppingRecommendationAvgAggregateInputType = {
    price?: true;
};
export type ShoppingRecommendationSumAggregateInputType = {
    price?: true;
};
export type ShoppingRecommendationMinAggregateInputType = {
    id?: true;
    userId?: true;
    category?: true;
    title?: true;
    description?: true;
    reason?: true;
    productUrl?: true;
    imageUrl?: true;
    price?: true;
    source?: true;
    createdAt?: true;
};
export type ShoppingRecommendationMaxAggregateInputType = {
    id?: true;
    userId?: true;
    category?: true;
    title?: true;
    description?: true;
    reason?: true;
    productUrl?: true;
    imageUrl?: true;
    price?: true;
    source?: true;
    createdAt?: true;
};
export type ShoppingRecommendationCountAggregateInputType = {
    id?: true;
    userId?: true;
    category?: true;
    title?: true;
    description?: true;
    reason?: true;
    productUrl?: true;
    imageUrl?: true;
    price?: true;
    source?: true;
    createdAt?: true;
    _all?: true;
};
export type ShoppingRecommendationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShoppingRecommendationWhereInput;
    orderBy?: Prisma.ShoppingRecommendationOrderByWithRelationInput | Prisma.ShoppingRecommendationOrderByWithRelationInput[];
    cursor?: Prisma.ShoppingRecommendationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ShoppingRecommendationCountAggregateInputType;
    _avg?: ShoppingRecommendationAvgAggregateInputType;
    _sum?: ShoppingRecommendationSumAggregateInputType;
    _min?: ShoppingRecommendationMinAggregateInputType;
    _max?: ShoppingRecommendationMaxAggregateInputType;
};
export type GetShoppingRecommendationAggregateType<T extends ShoppingRecommendationAggregateArgs> = {
    [P in keyof T & keyof AggregateShoppingRecommendation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateShoppingRecommendation[P]> : Prisma.GetScalarType<T[P], AggregateShoppingRecommendation[P]>;
};
export type ShoppingRecommendationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShoppingRecommendationWhereInput;
    orderBy?: Prisma.ShoppingRecommendationOrderByWithAggregationInput | Prisma.ShoppingRecommendationOrderByWithAggregationInput[];
    by: Prisma.ShoppingRecommendationScalarFieldEnum[] | Prisma.ShoppingRecommendationScalarFieldEnum;
    having?: Prisma.ShoppingRecommendationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ShoppingRecommendationCountAggregateInputType | true;
    _avg?: ShoppingRecommendationAvgAggregateInputType;
    _sum?: ShoppingRecommendationSumAggregateInputType;
    _min?: ShoppingRecommendationMinAggregateInputType;
    _max?: ShoppingRecommendationMaxAggregateInputType;
};
export type ShoppingRecommendationGroupByOutputType = {
    id: string;
    userId: string;
    category: string | null;
    title: string;
    description: string | null;
    reason: string | null;
    productUrl: string | null;
    imageUrl: string | null;
    price: runtime.Decimal | null;
    source: string | null;
    createdAt: Date;
    _count: ShoppingRecommendationCountAggregateOutputType | null;
    _avg: ShoppingRecommendationAvgAggregateOutputType | null;
    _sum: ShoppingRecommendationSumAggregateOutputType | null;
    _min: ShoppingRecommendationMinAggregateOutputType | null;
    _max: ShoppingRecommendationMaxAggregateOutputType | null;
};
export type GetShoppingRecommendationGroupByPayload<T extends ShoppingRecommendationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ShoppingRecommendationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ShoppingRecommendationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ShoppingRecommendationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ShoppingRecommendationGroupByOutputType[P]>;
}>>;
export type ShoppingRecommendationWhereInput = {
    AND?: Prisma.ShoppingRecommendationWhereInput | Prisma.ShoppingRecommendationWhereInput[];
    OR?: Prisma.ShoppingRecommendationWhereInput[];
    NOT?: Prisma.ShoppingRecommendationWhereInput | Prisma.ShoppingRecommendationWhereInput[];
    id?: Prisma.StringFilter<"ShoppingRecommendation"> | string;
    userId?: Prisma.StringFilter<"ShoppingRecommendation"> | string;
    category?: Prisma.StringNullableFilter<"ShoppingRecommendation"> | string | null;
    title?: Prisma.StringFilter<"ShoppingRecommendation"> | string;
    description?: Prisma.StringNullableFilter<"ShoppingRecommendation"> | string | null;
    reason?: Prisma.StringNullableFilter<"ShoppingRecommendation"> | string | null;
    productUrl?: Prisma.StringNullableFilter<"ShoppingRecommendation"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"ShoppingRecommendation"> | string | null;
    price?: Prisma.DecimalNullableFilter<"ShoppingRecommendation"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: Prisma.StringNullableFilter<"ShoppingRecommendation"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ShoppingRecommendation"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type ShoppingRecommendationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    category?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    productUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    price?: Prisma.SortOrderInput | Prisma.SortOrder;
    source?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type ShoppingRecommendationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ShoppingRecommendationWhereInput | Prisma.ShoppingRecommendationWhereInput[];
    OR?: Prisma.ShoppingRecommendationWhereInput[];
    NOT?: Prisma.ShoppingRecommendationWhereInput | Prisma.ShoppingRecommendationWhereInput[];
    userId?: Prisma.StringFilter<"ShoppingRecommendation"> | string;
    category?: Prisma.StringNullableFilter<"ShoppingRecommendation"> | string | null;
    title?: Prisma.StringFilter<"ShoppingRecommendation"> | string;
    description?: Prisma.StringNullableFilter<"ShoppingRecommendation"> | string | null;
    reason?: Prisma.StringNullableFilter<"ShoppingRecommendation"> | string | null;
    productUrl?: Prisma.StringNullableFilter<"ShoppingRecommendation"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"ShoppingRecommendation"> | string | null;
    price?: Prisma.DecimalNullableFilter<"ShoppingRecommendation"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: Prisma.StringNullableFilter<"ShoppingRecommendation"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ShoppingRecommendation"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type ShoppingRecommendationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    category?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    productUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    price?: Prisma.SortOrderInput | Prisma.SortOrder;
    source?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ShoppingRecommendationCountOrderByAggregateInput;
    _avg?: Prisma.ShoppingRecommendationAvgOrderByAggregateInput;
    _max?: Prisma.ShoppingRecommendationMaxOrderByAggregateInput;
    _min?: Prisma.ShoppingRecommendationMinOrderByAggregateInput;
    _sum?: Prisma.ShoppingRecommendationSumOrderByAggregateInput;
};
export type ShoppingRecommendationScalarWhereWithAggregatesInput = {
    AND?: Prisma.ShoppingRecommendationScalarWhereWithAggregatesInput | Prisma.ShoppingRecommendationScalarWhereWithAggregatesInput[];
    OR?: Prisma.ShoppingRecommendationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ShoppingRecommendationScalarWhereWithAggregatesInput | Prisma.ShoppingRecommendationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ShoppingRecommendation"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"ShoppingRecommendation"> | string;
    category?: Prisma.StringNullableWithAggregatesFilter<"ShoppingRecommendation"> | string | null;
    title?: Prisma.StringWithAggregatesFilter<"ShoppingRecommendation"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"ShoppingRecommendation"> | string | null;
    reason?: Prisma.StringNullableWithAggregatesFilter<"ShoppingRecommendation"> | string | null;
    productUrl?: Prisma.StringNullableWithAggregatesFilter<"ShoppingRecommendation"> | string | null;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"ShoppingRecommendation"> | string | null;
    price?: Prisma.DecimalNullableWithAggregatesFilter<"ShoppingRecommendation"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: Prisma.StringNullableWithAggregatesFilter<"ShoppingRecommendation"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ShoppingRecommendation"> | Date | string;
};
export type ShoppingRecommendationCreateInput = {
    id?: string;
    category?: string | null;
    title: string;
    description?: string | null;
    reason?: string | null;
    productUrl?: string | null;
    imageUrl?: string | null;
    price?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutShoppingRecommendationsInput;
};
export type ShoppingRecommendationUncheckedCreateInput = {
    id?: string;
    userId: string;
    category?: string | null;
    title: string;
    description?: string | null;
    reason?: string | null;
    productUrl?: string | null;
    imageUrl?: string | null;
    price?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: string | null;
    createdAt?: Date | string;
};
export type ShoppingRecommendationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutShoppingRecommendationsNestedInput;
};
export type ShoppingRecommendationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShoppingRecommendationCreateManyInput = {
    id?: string;
    userId: string;
    category?: string | null;
    title: string;
    description?: string | null;
    reason?: string | null;
    productUrl?: string | null;
    imageUrl?: string | null;
    price?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: string | null;
    createdAt?: Date | string;
};
export type ShoppingRecommendationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShoppingRecommendationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShoppingRecommendationListRelationFilter = {
    every?: Prisma.ShoppingRecommendationWhereInput;
    some?: Prisma.ShoppingRecommendationWhereInput;
    none?: Prisma.ShoppingRecommendationWhereInput;
};
export type ShoppingRecommendationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ShoppingRecommendationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    productUrl?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShoppingRecommendationAvgOrderByAggregateInput = {
    price?: Prisma.SortOrder;
};
export type ShoppingRecommendationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    productUrl?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShoppingRecommendationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    productUrl?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShoppingRecommendationSumOrderByAggregateInput = {
    price?: Prisma.SortOrder;
};
export type ShoppingRecommendationCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ShoppingRecommendationCreateWithoutUserInput, Prisma.ShoppingRecommendationUncheckedCreateWithoutUserInput> | Prisma.ShoppingRecommendationCreateWithoutUserInput[] | Prisma.ShoppingRecommendationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ShoppingRecommendationCreateOrConnectWithoutUserInput | Prisma.ShoppingRecommendationCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ShoppingRecommendationCreateManyUserInputEnvelope;
    connect?: Prisma.ShoppingRecommendationWhereUniqueInput | Prisma.ShoppingRecommendationWhereUniqueInput[];
};
export type ShoppingRecommendationUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ShoppingRecommendationCreateWithoutUserInput, Prisma.ShoppingRecommendationUncheckedCreateWithoutUserInput> | Prisma.ShoppingRecommendationCreateWithoutUserInput[] | Prisma.ShoppingRecommendationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ShoppingRecommendationCreateOrConnectWithoutUserInput | Prisma.ShoppingRecommendationCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ShoppingRecommendationCreateManyUserInputEnvelope;
    connect?: Prisma.ShoppingRecommendationWhereUniqueInput | Prisma.ShoppingRecommendationWhereUniqueInput[];
};
export type ShoppingRecommendationUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ShoppingRecommendationCreateWithoutUserInput, Prisma.ShoppingRecommendationUncheckedCreateWithoutUserInput> | Prisma.ShoppingRecommendationCreateWithoutUserInput[] | Prisma.ShoppingRecommendationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ShoppingRecommendationCreateOrConnectWithoutUserInput | Prisma.ShoppingRecommendationCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ShoppingRecommendationUpsertWithWhereUniqueWithoutUserInput | Prisma.ShoppingRecommendationUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ShoppingRecommendationCreateManyUserInputEnvelope;
    set?: Prisma.ShoppingRecommendationWhereUniqueInput | Prisma.ShoppingRecommendationWhereUniqueInput[];
    disconnect?: Prisma.ShoppingRecommendationWhereUniqueInput | Prisma.ShoppingRecommendationWhereUniqueInput[];
    delete?: Prisma.ShoppingRecommendationWhereUniqueInput | Prisma.ShoppingRecommendationWhereUniqueInput[];
    connect?: Prisma.ShoppingRecommendationWhereUniqueInput | Prisma.ShoppingRecommendationWhereUniqueInput[];
    update?: Prisma.ShoppingRecommendationUpdateWithWhereUniqueWithoutUserInput | Prisma.ShoppingRecommendationUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ShoppingRecommendationUpdateManyWithWhereWithoutUserInput | Prisma.ShoppingRecommendationUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ShoppingRecommendationScalarWhereInput | Prisma.ShoppingRecommendationScalarWhereInput[];
};
export type ShoppingRecommendationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ShoppingRecommendationCreateWithoutUserInput, Prisma.ShoppingRecommendationUncheckedCreateWithoutUserInput> | Prisma.ShoppingRecommendationCreateWithoutUserInput[] | Prisma.ShoppingRecommendationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ShoppingRecommendationCreateOrConnectWithoutUserInput | Prisma.ShoppingRecommendationCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ShoppingRecommendationUpsertWithWhereUniqueWithoutUserInput | Prisma.ShoppingRecommendationUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ShoppingRecommendationCreateManyUserInputEnvelope;
    set?: Prisma.ShoppingRecommendationWhereUniqueInput | Prisma.ShoppingRecommendationWhereUniqueInput[];
    disconnect?: Prisma.ShoppingRecommendationWhereUniqueInput | Prisma.ShoppingRecommendationWhereUniqueInput[];
    delete?: Prisma.ShoppingRecommendationWhereUniqueInput | Prisma.ShoppingRecommendationWhereUniqueInput[];
    connect?: Prisma.ShoppingRecommendationWhereUniqueInput | Prisma.ShoppingRecommendationWhereUniqueInput[];
    update?: Prisma.ShoppingRecommendationUpdateWithWhereUniqueWithoutUserInput | Prisma.ShoppingRecommendationUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ShoppingRecommendationUpdateManyWithWhereWithoutUserInput | Prisma.ShoppingRecommendationUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ShoppingRecommendationScalarWhereInput | Prisma.ShoppingRecommendationScalarWhereInput[];
};
export type ShoppingRecommendationCreateWithoutUserInput = {
    id?: string;
    category?: string | null;
    title: string;
    description?: string | null;
    reason?: string | null;
    productUrl?: string | null;
    imageUrl?: string | null;
    price?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: string | null;
    createdAt?: Date | string;
};
export type ShoppingRecommendationUncheckedCreateWithoutUserInput = {
    id?: string;
    category?: string | null;
    title: string;
    description?: string | null;
    reason?: string | null;
    productUrl?: string | null;
    imageUrl?: string | null;
    price?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: string | null;
    createdAt?: Date | string;
};
export type ShoppingRecommendationCreateOrConnectWithoutUserInput = {
    where: Prisma.ShoppingRecommendationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShoppingRecommendationCreateWithoutUserInput, Prisma.ShoppingRecommendationUncheckedCreateWithoutUserInput>;
};
export type ShoppingRecommendationCreateManyUserInputEnvelope = {
    data: Prisma.ShoppingRecommendationCreateManyUserInput | Prisma.ShoppingRecommendationCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ShoppingRecommendationUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ShoppingRecommendationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ShoppingRecommendationUpdateWithoutUserInput, Prisma.ShoppingRecommendationUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ShoppingRecommendationCreateWithoutUserInput, Prisma.ShoppingRecommendationUncheckedCreateWithoutUserInput>;
};
export type ShoppingRecommendationUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ShoppingRecommendationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ShoppingRecommendationUpdateWithoutUserInput, Prisma.ShoppingRecommendationUncheckedUpdateWithoutUserInput>;
};
export type ShoppingRecommendationUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ShoppingRecommendationScalarWhereInput;
    data: Prisma.XOR<Prisma.ShoppingRecommendationUpdateManyMutationInput, Prisma.ShoppingRecommendationUncheckedUpdateManyWithoutUserInput>;
};
export type ShoppingRecommendationScalarWhereInput = {
    AND?: Prisma.ShoppingRecommendationScalarWhereInput | Prisma.ShoppingRecommendationScalarWhereInput[];
    OR?: Prisma.ShoppingRecommendationScalarWhereInput[];
    NOT?: Prisma.ShoppingRecommendationScalarWhereInput | Prisma.ShoppingRecommendationScalarWhereInput[];
    id?: Prisma.StringFilter<"ShoppingRecommendation"> | string;
    userId?: Prisma.StringFilter<"ShoppingRecommendation"> | string;
    category?: Prisma.StringNullableFilter<"ShoppingRecommendation"> | string | null;
    title?: Prisma.StringFilter<"ShoppingRecommendation"> | string;
    description?: Prisma.StringNullableFilter<"ShoppingRecommendation"> | string | null;
    reason?: Prisma.StringNullableFilter<"ShoppingRecommendation"> | string | null;
    productUrl?: Prisma.StringNullableFilter<"ShoppingRecommendation"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"ShoppingRecommendation"> | string | null;
    price?: Prisma.DecimalNullableFilter<"ShoppingRecommendation"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: Prisma.StringNullableFilter<"ShoppingRecommendation"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ShoppingRecommendation"> | Date | string;
};
export type ShoppingRecommendationCreateManyUserInput = {
    id?: string;
    category?: string | null;
    title: string;
    description?: string | null;
    reason?: string | null;
    productUrl?: string | null;
    imageUrl?: string | null;
    price?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: string | null;
    createdAt?: Date | string;
};
export type ShoppingRecommendationUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShoppingRecommendationUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShoppingRecommendationUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShoppingRecommendationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    category?: boolean;
    title?: boolean;
    description?: boolean;
    reason?: boolean;
    productUrl?: boolean;
    imageUrl?: boolean;
    price?: boolean;
    source?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shoppingRecommendation"]>;
export type ShoppingRecommendationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    category?: boolean;
    title?: boolean;
    description?: boolean;
    reason?: boolean;
    productUrl?: boolean;
    imageUrl?: boolean;
    price?: boolean;
    source?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shoppingRecommendation"]>;
export type ShoppingRecommendationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    category?: boolean;
    title?: boolean;
    description?: boolean;
    reason?: boolean;
    productUrl?: boolean;
    imageUrl?: boolean;
    price?: boolean;
    source?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shoppingRecommendation"]>;
export type ShoppingRecommendationSelectScalar = {
    id?: boolean;
    userId?: boolean;
    category?: boolean;
    title?: boolean;
    description?: boolean;
    reason?: boolean;
    productUrl?: boolean;
    imageUrl?: boolean;
    price?: boolean;
    source?: boolean;
    createdAt?: boolean;
};
export type ShoppingRecommendationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "category" | "title" | "description" | "reason" | "productUrl" | "imageUrl" | "price" | "source" | "createdAt", ExtArgs["result"]["shoppingRecommendation"]>;
export type ShoppingRecommendationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ShoppingRecommendationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ShoppingRecommendationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ShoppingRecommendationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ShoppingRecommendation";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        category: string | null;
        title: string;
        description: string | null;
        reason: string | null;
        productUrl: string | null;
        imageUrl: string | null;
        price: runtime.Decimal | null;
        source: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["shoppingRecommendation"]>;
    composites: {};
};
export type ShoppingRecommendationGetPayload<S extends boolean | null | undefined | ShoppingRecommendationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ShoppingRecommendationPayload, S>;
export type ShoppingRecommendationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ShoppingRecommendationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ShoppingRecommendationCountAggregateInputType | true;
};
export interface ShoppingRecommendationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ShoppingRecommendation'];
        meta: {
            name: 'ShoppingRecommendation';
        };
    };
    findUnique<T extends ShoppingRecommendationFindUniqueArgs>(args: Prisma.SelectSubset<T, ShoppingRecommendationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ShoppingRecommendationClient<runtime.Types.Result.GetResult<Prisma.$ShoppingRecommendationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ShoppingRecommendationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ShoppingRecommendationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShoppingRecommendationClient<runtime.Types.Result.GetResult<Prisma.$ShoppingRecommendationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ShoppingRecommendationFindFirstArgs>(args?: Prisma.SelectSubset<T, ShoppingRecommendationFindFirstArgs<ExtArgs>>): Prisma.Prisma__ShoppingRecommendationClient<runtime.Types.Result.GetResult<Prisma.$ShoppingRecommendationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ShoppingRecommendationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ShoppingRecommendationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShoppingRecommendationClient<runtime.Types.Result.GetResult<Prisma.$ShoppingRecommendationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ShoppingRecommendationFindManyArgs>(args?: Prisma.SelectSubset<T, ShoppingRecommendationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShoppingRecommendationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ShoppingRecommendationCreateArgs>(args: Prisma.SelectSubset<T, ShoppingRecommendationCreateArgs<ExtArgs>>): Prisma.Prisma__ShoppingRecommendationClient<runtime.Types.Result.GetResult<Prisma.$ShoppingRecommendationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ShoppingRecommendationCreateManyArgs>(args?: Prisma.SelectSubset<T, ShoppingRecommendationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ShoppingRecommendationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ShoppingRecommendationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShoppingRecommendationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ShoppingRecommendationDeleteArgs>(args: Prisma.SelectSubset<T, ShoppingRecommendationDeleteArgs<ExtArgs>>): Prisma.Prisma__ShoppingRecommendationClient<runtime.Types.Result.GetResult<Prisma.$ShoppingRecommendationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ShoppingRecommendationUpdateArgs>(args: Prisma.SelectSubset<T, ShoppingRecommendationUpdateArgs<ExtArgs>>): Prisma.Prisma__ShoppingRecommendationClient<runtime.Types.Result.GetResult<Prisma.$ShoppingRecommendationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ShoppingRecommendationDeleteManyArgs>(args?: Prisma.SelectSubset<T, ShoppingRecommendationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ShoppingRecommendationUpdateManyArgs>(args: Prisma.SelectSubset<T, ShoppingRecommendationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ShoppingRecommendationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ShoppingRecommendationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShoppingRecommendationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ShoppingRecommendationUpsertArgs>(args: Prisma.SelectSubset<T, ShoppingRecommendationUpsertArgs<ExtArgs>>): Prisma.Prisma__ShoppingRecommendationClient<runtime.Types.Result.GetResult<Prisma.$ShoppingRecommendationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ShoppingRecommendationCountArgs>(args?: Prisma.Subset<T, ShoppingRecommendationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ShoppingRecommendationCountAggregateOutputType> : number>;
    aggregate<T extends ShoppingRecommendationAggregateArgs>(args: Prisma.Subset<T, ShoppingRecommendationAggregateArgs>): Prisma.PrismaPromise<GetShoppingRecommendationAggregateType<T>>;
    groupBy<T extends ShoppingRecommendationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ShoppingRecommendationGroupByArgs['orderBy'];
    } : {
        orderBy?: ShoppingRecommendationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ShoppingRecommendationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShoppingRecommendationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ShoppingRecommendationFieldRefs;
}
export interface Prisma__ShoppingRecommendationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ShoppingRecommendationFieldRefs {
    readonly id: Prisma.FieldRef<"ShoppingRecommendation", 'String'>;
    readonly userId: Prisma.FieldRef<"ShoppingRecommendation", 'String'>;
    readonly category: Prisma.FieldRef<"ShoppingRecommendation", 'String'>;
    readonly title: Prisma.FieldRef<"ShoppingRecommendation", 'String'>;
    readonly description: Prisma.FieldRef<"ShoppingRecommendation", 'String'>;
    readonly reason: Prisma.FieldRef<"ShoppingRecommendation", 'String'>;
    readonly productUrl: Prisma.FieldRef<"ShoppingRecommendation", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"ShoppingRecommendation", 'String'>;
    readonly price: Prisma.FieldRef<"ShoppingRecommendation", 'Decimal'>;
    readonly source: Prisma.FieldRef<"ShoppingRecommendation", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ShoppingRecommendation", 'DateTime'>;
}
export type ShoppingRecommendationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShoppingRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.ShoppingRecommendationOmit<ExtArgs> | null;
    include?: Prisma.ShoppingRecommendationInclude<ExtArgs> | null;
    where: Prisma.ShoppingRecommendationWhereUniqueInput;
};
export type ShoppingRecommendationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShoppingRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.ShoppingRecommendationOmit<ExtArgs> | null;
    include?: Prisma.ShoppingRecommendationInclude<ExtArgs> | null;
    where: Prisma.ShoppingRecommendationWhereUniqueInput;
};
export type ShoppingRecommendationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ShoppingRecommendationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ShoppingRecommendationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ShoppingRecommendationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShoppingRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.ShoppingRecommendationOmit<ExtArgs> | null;
    include?: Prisma.ShoppingRecommendationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShoppingRecommendationCreateInput, Prisma.ShoppingRecommendationUncheckedCreateInput>;
};
export type ShoppingRecommendationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ShoppingRecommendationCreateManyInput | Prisma.ShoppingRecommendationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ShoppingRecommendationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShoppingRecommendationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ShoppingRecommendationOmit<ExtArgs> | null;
    data: Prisma.ShoppingRecommendationCreateManyInput | Prisma.ShoppingRecommendationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ShoppingRecommendationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ShoppingRecommendationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShoppingRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.ShoppingRecommendationOmit<ExtArgs> | null;
    include?: Prisma.ShoppingRecommendationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShoppingRecommendationUpdateInput, Prisma.ShoppingRecommendationUncheckedUpdateInput>;
    where: Prisma.ShoppingRecommendationWhereUniqueInput;
};
export type ShoppingRecommendationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ShoppingRecommendationUpdateManyMutationInput, Prisma.ShoppingRecommendationUncheckedUpdateManyInput>;
    where?: Prisma.ShoppingRecommendationWhereInput;
    limit?: number;
};
export type ShoppingRecommendationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShoppingRecommendationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ShoppingRecommendationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShoppingRecommendationUpdateManyMutationInput, Prisma.ShoppingRecommendationUncheckedUpdateManyInput>;
    where?: Prisma.ShoppingRecommendationWhereInput;
    limit?: number;
    include?: Prisma.ShoppingRecommendationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ShoppingRecommendationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShoppingRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.ShoppingRecommendationOmit<ExtArgs> | null;
    include?: Prisma.ShoppingRecommendationInclude<ExtArgs> | null;
    where: Prisma.ShoppingRecommendationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShoppingRecommendationCreateInput, Prisma.ShoppingRecommendationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ShoppingRecommendationUpdateInput, Prisma.ShoppingRecommendationUncheckedUpdateInput>;
};
export type ShoppingRecommendationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShoppingRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.ShoppingRecommendationOmit<ExtArgs> | null;
    include?: Prisma.ShoppingRecommendationInclude<ExtArgs> | null;
    where: Prisma.ShoppingRecommendationWhereUniqueInput;
};
export type ShoppingRecommendationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShoppingRecommendationWhereInput;
    limit?: number;
};
export type ShoppingRecommendationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShoppingRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.ShoppingRecommendationOmit<ExtArgs> | null;
    include?: Prisma.ShoppingRecommendationInclude<ExtArgs> | null;
};
