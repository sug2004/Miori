import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type StylePreferencesModel = runtime.Types.Result.DefaultSelection<Prisma.$StylePreferencesPayload>;
export type AggregateStylePreferences = {
    _count: StylePreferencesCountAggregateOutputType | null;
    _avg: StylePreferencesAvgAggregateOutputType | null;
    _sum: StylePreferencesSumAggregateOutputType | null;
    _min: StylePreferencesMinAggregateOutputType | null;
    _max: StylePreferencesMaxAggregateOutputType | null;
};
export type StylePreferencesAvgAggregateOutputType = {
    budgetMin: number | null;
    budgetMax: number | null;
};
export type StylePreferencesSumAggregateOutputType = {
    budgetMin: number | null;
    budgetMax: number | null;
};
export type StylePreferencesMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    budgetMin: number | null;
    budgetMax: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type StylePreferencesMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    budgetMin: number | null;
    budgetMax: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type StylePreferencesCountAggregateOutputType = {
    id: number;
    userId: number;
    styleGoals: number;
    styleTags: number;
    colorPalette: number;
    preferredCategories: number;
    budgetMin: number;
    budgetMax: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type StylePreferencesAvgAggregateInputType = {
    budgetMin?: true;
    budgetMax?: true;
};
export type StylePreferencesSumAggregateInputType = {
    budgetMin?: true;
    budgetMax?: true;
};
export type StylePreferencesMinAggregateInputType = {
    id?: true;
    userId?: true;
    budgetMin?: true;
    budgetMax?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type StylePreferencesMaxAggregateInputType = {
    id?: true;
    userId?: true;
    budgetMin?: true;
    budgetMax?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type StylePreferencesCountAggregateInputType = {
    id?: true;
    userId?: true;
    styleGoals?: true;
    styleTags?: true;
    colorPalette?: true;
    preferredCategories?: true;
    budgetMin?: true;
    budgetMax?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type StylePreferencesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StylePreferencesWhereInput;
    orderBy?: Prisma.StylePreferencesOrderByWithRelationInput | Prisma.StylePreferencesOrderByWithRelationInput[];
    cursor?: Prisma.StylePreferencesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | StylePreferencesCountAggregateInputType;
    _avg?: StylePreferencesAvgAggregateInputType;
    _sum?: StylePreferencesSumAggregateInputType;
    _min?: StylePreferencesMinAggregateInputType;
    _max?: StylePreferencesMaxAggregateInputType;
};
export type GetStylePreferencesAggregateType<T extends StylePreferencesAggregateArgs> = {
    [P in keyof T & keyof AggregateStylePreferences]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStylePreferences[P]> : Prisma.GetScalarType<T[P], AggregateStylePreferences[P]>;
};
export type StylePreferencesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StylePreferencesWhereInput;
    orderBy?: Prisma.StylePreferencesOrderByWithAggregationInput | Prisma.StylePreferencesOrderByWithAggregationInput[];
    by: Prisma.StylePreferencesScalarFieldEnum[] | Prisma.StylePreferencesScalarFieldEnum;
    having?: Prisma.StylePreferencesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StylePreferencesCountAggregateInputType | true;
    _avg?: StylePreferencesAvgAggregateInputType;
    _sum?: StylePreferencesSumAggregateInputType;
    _min?: StylePreferencesMinAggregateInputType;
    _max?: StylePreferencesMaxAggregateInputType;
};
export type StylePreferencesGroupByOutputType = {
    id: string;
    userId: string;
    styleGoals: runtime.JsonValue | null;
    styleTags: runtime.JsonValue | null;
    colorPalette: runtime.JsonValue | null;
    preferredCategories: runtime.JsonValue | null;
    budgetMin: number | null;
    budgetMax: number | null;
    createdAt: Date;
    updatedAt: Date;
    _count: StylePreferencesCountAggregateOutputType | null;
    _avg: StylePreferencesAvgAggregateOutputType | null;
    _sum: StylePreferencesSumAggregateOutputType | null;
    _min: StylePreferencesMinAggregateOutputType | null;
    _max: StylePreferencesMaxAggregateOutputType | null;
};
export type GetStylePreferencesGroupByPayload<T extends StylePreferencesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StylePreferencesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StylePreferencesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StylePreferencesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StylePreferencesGroupByOutputType[P]>;
}>>;
export type StylePreferencesWhereInput = {
    AND?: Prisma.StylePreferencesWhereInput | Prisma.StylePreferencesWhereInput[];
    OR?: Prisma.StylePreferencesWhereInput[];
    NOT?: Prisma.StylePreferencesWhereInput | Prisma.StylePreferencesWhereInput[];
    id?: Prisma.StringFilter<"StylePreferences"> | string;
    userId?: Prisma.StringFilter<"StylePreferences"> | string;
    styleGoals?: Prisma.JsonNullableFilter<"StylePreferences">;
    styleTags?: Prisma.JsonNullableFilter<"StylePreferences">;
    colorPalette?: Prisma.JsonNullableFilter<"StylePreferences">;
    preferredCategories?: Prisma.JsonNullableFilter<"StylePreferences">;
    budgetMin?: Prisma.IntNullableFilter<"StylePreferences"> | number | null;
    budgetMax?: Prisma.IntNullableFilter<"StylePreferences"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"StylePreferences"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"StylePreferences"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type StylePreferencesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    styleGoals?: Prisma.SortOrderInput | Prisma.SortOrder;
    styleTags?: Prisma.SortOrderInput | Prisma.SortOrder;
    colorPalette?: Prisma.SortOrderInput | Prisma.SortOrder;
    preferredCategories?: Prisma.SortOrderInput | Prisma.SortOrder;
    budgetMin?: Prisma.SortOrderInput | Prisma.SortOrder;
    budgetMax?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type StylePreferencesWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.StylePreferencesWhereInput | Prisma.StylePreferencesWhereInput[];
    OR?: Prisma.StylePreferencesWhereInput[];
    NOT?: Prisma.StylePreferencesWhereInput | Prisma.StylePreferencesWhereInput[];
    styleGoals?: Prisma.JsonNullableFilter<"StylePreferences">;
    styleTags?: Prisma.JsonNullableFilter<"StylePreferences">;
    colorPalette?: Prisma.JsonNullableFilter<"StylePreferences">;
    preferredCategories?: Prisma.JsonNullableFilter<"StylePreferences">;
    budgetMin?: Prisma.IntNullableFilter<"StylePreferences"> | number | null;
    budgetMax?: Prisma.IntNullableFilter<"StylePreferences"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"StylePreferences"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"StylePreferences"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type StylePreferencesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    styleGoals?: Prisma.SortOrderInput | Prisma.SortOrder;
    styleTags?: Prisma.SortOrderInput | Prisma.SortOrder;
    colorPalette?: Prisma.SortOrderInput | Prisma.SortOrder;
    preferredCategories?: Prisma.SortOrderInput | Prisma.SortOrder;
    budgetMin?: Prisma.SortOrderInput | Prisma.SortOrder;
    budgetMax?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.StylePreferencesCountOrderByAggregateInput;
    _avg?: Prisma.StylePreferencesAvgOrderByAggregateInput;
    _max?: Prisma.StylePreferencesMaxOrderByAggregateInput;
    _min?: Prisma.StylePreferencesMinOrderByAggregateInput;
    _sum?: Prisma.StylePreferencesSumOrderByAggregateInput;
};
export type StylePreferencesScalarWhereWithAggregatesInput = {
    AND?: Prisma.StylePreferencesScalarWhereWithAggregatesInput | Prisma.StylePreferencesScalarWhereWithAggregatesInput[];
    OR?: Prisma.StylePreferencesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StylePreferencesScalarWhereWithAggregatesInput | Prisma.StylePreferencesScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"StylePreferences"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"StylePreferences"> | string;
    styleGoals?: Prisma.JsonNullableWithAggregatesFilter<"StylePreferences">;
    styleTags?: Prisma.JsonNullableWithAggregatesFilter<"StylePreferences">;
    colorPalette?: Prisma.JsonNullableWithAggregatesFilter<"StylePreferences">;
    preferredCategories?: Prisma.JsonNullableWithAggregatesFilter<"StylePreferences">;
    budgetMin?: Prisma.IntNullableWithAggregatesFilter<"StylePreferences"> | number | null;
    budgetMax?: Prisma.IntNullableWithAggregatesFilter<"StylePreferences"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"StylePreferences"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"StylePreferences"> | Date | string;
};
export type StylePreferencesCreateInput = {
    id?: string;
    styleGoals?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    styleTags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    colorPalette?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    preferredCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    budgetMin?: number | null;
    budgetMax?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutStylePreferencesInput;
};
export type StylePreferencesUncheckedCreateInput = {
    id?: string;
    userId: string;
    styleGoals?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    styleTags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    colorPalette?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    preferredCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    budgetMin?: number | null;
    budgetMax?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StylePreferencesUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    styleGoals?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    styleTags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    colorPalette?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    preferredCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    budgetMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    budgetMax?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStylePreferencesNestedInput;
};
export type StylePreferencesUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    styleGoals?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    styleTags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    colorPalette?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    preferredCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    budgetMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    budgetMax?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StylePreferencesCreateManyInput = {
    id?: string;
    userId: string;
    styleGoals?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    styleTags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    colorPalette?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    preferredCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    budgetMin?: number | null;
    budgetMax?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StylePreferencesUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    styleGoals?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    styleTags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    colorPalette?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    preferredCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    budgetMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    budgetMax?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StylePreferencesUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    styleGoals?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    styleTags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    colorPalette?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    preferredCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    budgetMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    budgetMax?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StylePreferencesNullableScalarRelationFilter = {
    is?: Prisma.StylePreferencesWhereInput | null;
    isNot?: Prisma.StylePreferencesWhereInput | null;
};
export type StylePreferencesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    styleGoals?: Prisma.SortOrder;
    styleTags?: Prisma.SortOrder;
    colorPalette?: Prisma.SortOrder;
    preferredCategories?: Prisma.SortOrder;
    budgetMin?: Prisma.SortOrder;
    budgetMax?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StylePreferencesAvgOrderByAggregateInput = {
    budgetMin?: Prisma.SortOrder;
    budgetMax?: Prisma.SortOrder;
};
export type StylePreferencesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    budgetMin?: Prisma.SortOrder;
    budgetMax?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StylePreferencesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    budgetMin?: Prisma.SortOrder;
    budgetMax?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StylePreferencesSumOrderByAggregateInput = {
    budgetMin?: Prisma.SortOrder;
    budgetMax?: Prisma.SortOrder;
};
export type StylePreferencesCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StylePreferencesCreateWithoutUserInput, Prisma.StylePreferencesUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StylePreferencesCreateOrConnectWithoutUserInput;
    connect?: Prisma.StylePreferencesWhereUniqueInput;
};
export type StylePreferencesUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StylePreferencesCreateWithoutUserInput, Prisma.StylePreferencesUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StylePreferencesCreateOrConnectWithoutUserInput;
    connect?: Prisma.StylePreferencesWhereUniqueInput;
};
export type StylePreferencesUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StylePreferencesCreateWithoutUserInput, Prisma.StylePreferencesUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StylePreferencesCreateOrConnectWithoutUserInput;
    upsert?: Prisma.StylePreferencesUpsertWithoutUserInput;
    disconnect?: Prisma.StylePreferencesWhereInput | boolean;
    delete?: Prisma.StylePreferencesWhereInput | boolean;
    connect?: Prisma.StylePreferencesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StylePreferencesUpdateToOneWithWhereWithoutUserInput, Prisma.StylePreferencesUpdateWithoutUserInput>, Prisma.StylePreferencesUncheckedUpdateWithoutUserInput>;
};
export type StylePreferencesUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StylePreferencesCreateWithoutUserInput, Prisma.StylePreferencesUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StylePreferencesCreateOrConnectWithoutUserInput;
    upsert?: Prisma.StylePreferencesUpsertWithoutUserInput;
    disconnect?: Prisma.StylePreferencesWhereInput | boolean;
    delete?: Prisma.StylePreferencesWhereInput | boolean;
    connect?: Prisma.StylePreferencesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StylePreferencesUpdateToOneWithWhereWithoutUserInput, Prisma.StylePreferencesUpdateWithoutUserInput>, Prisma.StylePreferencesUncheckedUpdateWithoutUserInput>;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type StylePreferencesCreateWithoutUserInput = {
    id?: string;
    styleGoals?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    styleTags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    colorPalette?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    preferredCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    budgetMin?: number | null;
    budgetMax?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StylePreferencesUncheckedCreateWithoutUserInput = {
    id?: string;
    styleGoals?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    styleTags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    colorPalette?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    preferredCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    budgetMin?: number | null;
    budgetMax?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StylePreferencesCreateOrConnectWithoutUserInput = {
    where: Prisma.StylePreferencesWhereUniqueInput;
    create: Prisma.XOR<Prisma.StylePreferencesCreateWithoutUserInput, Prisma.StylePreferencesUncheckedCreateWithoutUserInput>;
};
export type StylePreferencesUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.StylePreferencesUpdateWithoutUserInput, Prisma.StylePreferencesUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.StylePreferencesCreateWithoutUserInput, Prisma.StylePreferencesUncheckedCreateWithoutUserInput>;
    where?: Prisma.StylePreferencesWhereInput;
};
export type StylePreferencesUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.StylePreferencesWhereInput;
    data: Prisma.XOR<Prisma.StylePreferencesUpdateWithoutUserInput, Prisma.StylePreferencesUncheckedUpdateWithoutUserInput>;
};
export type StylePreferencesUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    styleGoals?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    styleTags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    colorPalette?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    preferredCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    budgetMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    budgetMax?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StylePreferencesUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    styleGoals?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    styleTags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    colorPalette?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    preferredCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    budgetMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    budgetMax?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StylePreferencesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    styleGoals?: boolean;
    styleTags?: boolean;
    colorPalette?: boolean;
    preferredCategories?: boolean;
    budgetMin?: boolean;
    budgetMax?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["stylePreferences"]>;
export type StylePreferencesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    styleGoals?: boolean;
    styleTags?: boolean;
    colorPalette?: boolean;
    preferredCategories?: boolean;
    budgetMin?: boolean;
    budgetMax?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["stylePreferences"]>;
export type StylePreferencesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    styleGoals?: boolean;
    styleTags?: boolean;
    colorPalette?: boolean;
    preferredCategories?: boolean;
    budgetMin?: boolean;
    budgetMax?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["stylePreferences"]>;
export type StylePreferencesSelectScalar = {
    id?: boolean;
    userId?: boolean;
    styleGoals?: boolean;
    styleTags?: boolean;
    colorPalette?: boolean;
    preferredCategories?: boolean;
    budgetMin?: boolean;
    budgetMax?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type StylePreferencesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "styleGoals" | "styleTags" | "colorPalette" | "preferredCategories" | "budgetMin" | "budgetMax" | "createdAt" | "updatedAt", ExtArgs["result"]["stylePreferences"]>;
export type StylePreferencesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type StylePreferencesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type StylePreferencesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $StylePreferencesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StylePreferences";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        styleGoals: runtime.JsonValue | null;
        styleTags: runtime.JsonValue | null;
        colorPalette: runtime.JsonValue | null;
        preferredCategories: runtime.JsonValue | null;
        budgetMin: number | null;
        budgetMax: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["stylePreferences"]>;
    composites: {};
};
export type StylePreferencesGetPayload<S extends boolean | null | undefined | StylePreferencesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StylePreferencesPayload, S>;
export type StylePreferencesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StylePreferencesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StylePreferencesCountAggregateInputType | true;
};
export interface StylePreferencesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StylePreferences'];
        meta: {
            name: 'StylePreferences';
        };
    };
    findUnique<T extends StylePreferencesFindUniqueArgs>(args: Prisma.SelectSubset<T, StylePreferencesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StylePreferencesClient<runtime.Types.Result.GetResult<Prisma.$StylePreferencesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends StylePreferencesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StylePreferencesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StylePreferencesClient<runtime.Types.Result.GetResult<Prisma.$StylePreferencesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends StylePreferencesFindFirstArgs>(args?: Prisma.SelectSubset<T, StylePreferencesFindFirstArgs<ExtArgs>>): Prisma.Prisma__StylePreferencesClient<runtime.Types.Result.GetResult<Prisma.$StylePreferencesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends StylePreferencesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StylePreferencesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StylePreferencesClient<runtime.Types.Result.GetResult<Prisma.$StylePreferencesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends StylePreferencesFindManyArgs>(args?: Prisma.SelectSubset<T, StylePreferencesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StylePreferencesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends StylePreferencesCreateArgs>(args: Prisma.SelectSubset<T, StylePreferencesCreateArgs<ExtArgs>>): Prisma.Prisma__StylePreferencesClient<runtime.Types.Result.GetResult<Prisma.$StylePreferencesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends StylePreferencesCreateManyArgs>(args?: Prisma.SelectSubset<T, StylePreferencesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends StylePreferencesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StylePreferencesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StylePreferencesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends StylePreferencesDeleteArgs>(args: Prisma.SelectSubset<T, StylePreferencesDeleteArgs<ExtArgs>>): Prisma.Prisma__StylePreferencesClient<runtime.Types.Result.GetResult<Prisma.$StylePreferencesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends StylePreferencesUpdateArgs>(args: Prisma.SelectSubset<T, StylePreferencesUpdateArgs<ExtArgs>>): Prisma.Prisma__StylePreferencesClient<runtime.Types.Result.GetResult<Prisma.$StylePreferencesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends StylePreferencesDeleteManyArgs>(args?: Prisma.SelectSubset<T, StylePreferencesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends StylePreferencesUpdateManyArgs>(args: Prisma.SelectSubset<T, StylePreferencesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends StylePreferencesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StylePreferencesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StylePreferencesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends StylePreferencesUpsertArgs>(args: Prisma.SelectSubset<T, StylePreferencesUpsertArgs<ExtArgs>>): Prisma.Prisma__StylePreferencesClient<runtime.Types.Result.GetResult<Prisma.$StylePreferencesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends StylePreferencesCountArgs>(args?: Prisma.Subset<T, StylePreferencesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StylePreferencesCountAggregateOutputType> : number>;
    aggregate<T extends StylePreferencesAggregateArgs>(args: Prisma.Subset<T, StylePreferencesAggregateArgs>): Prisma.PrismaPromise<GetStylePreferencesAggregateType<T>>;
    groupBy<T extends StylePreferencesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StylePreferencesGroupByArgs['orderBy'];
    } : {
        orderBy?: StylePreferencesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StylePreferencesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStylePreferencesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: StylePreferencesFieldRefs;
}
export interface Prisma__StylePreferencesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface StylePreferencesFieldRefs {
    readonly id: Prisma.FieldRef<"StylePreferences", 'String'>;
    readonly userId: Prisma.FieldRef<"StylePreferences", 'String'>;
    readonly styleGoals: Prisma.FieldRef<"StylePreferences", 'Json'>;
    readonly styleTags: Prisma.FieldRef<"StylePreferences", 'Json'>;
    readonly colorPalette: Prisma.FieldRef<"StylePreferences", 'Json'>;
    readonly preferredCategories: Prisma.FieldRef<"StylePreferences", 'Json'>;
    readonly budgetMin: Prisma.FieldRef<"StylePreferences", 'Int'>;
    readonly budgetMax: Prisma.FieldRef<"StylePreferences", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"StylePreferences", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"StylePreferences", 'DateTime'>;
}
export type StylePreferencesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StylePreferencesSelect<ExtArgs> | null;
    omit?: Prisma.StylePreferencesOmit<ExtArgs> | null;
    include?: Prisma.StylePreferencesInclude<ExtArgs> | null;
    where: Prisma.StylePreferencesWhereUniqueInput;
};
export type StylePreferencesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StylePreferencesSelect<ExtArgs> | null;
    omit?: Prisma.StylePreferencesOmit<ExtArgs> | null;
    include?: Prisma.StylePreferencesInclude<ExtArgs> | null;
    where: Prisma.StylePreferencesWhereUniqueInput;
};
export type StylePreferencesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StylePreferencesSelect<ExtArgs> | null;
    omit?: Prisma.StylePreferencesOmit<ExtArgs> | null;
    include?: Prisma.StylePreferencesInclude<ExtArgs> | null;
    where?: Prisma.StylePreferencesWhereInput;
    orderBy?: Prisma.StylePreferencesOrderByWithRelationInput | Prisma.StylePreferencesOrderByWithRelationInput[];
    cursor?: Prisma.StylePreferencesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StylePreferencesScalarFieldEnum | Prisma.StylePreferencesScalarFieldEnum[];
};
export type StylePreferencesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StylePreferencesSelect<ExtArgs> | null;
    omit?: Prisma.StylePreferencesOmit<ExtArgs> | null;
    include?: Prisma.StylePreferencesInclude<ExtArgs> | null;
    where?: Prisma.StylePreferencesWhereInput;
    orderBy?: Prisma.StylePreferencesOrderByWithRelationInput | Prisma.StylePreferencesOrderByWithRelationInput[];
    cursor?: Prisma.StylePreferencesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StylePreferencesScalarFieldEnum | Prisma.StylePreferencesScalarFieldEnum[];
};
export type StylePreferencesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StylePreferencesSelect<ExtArgs> | null;
    omit?: Prisma.StylePreferencesOmit<ExtArgs> | null;
    include?: Prisma.StylePreferencesInclude<ExtArgs> | null;
    where?: Prisma.StylePreferencesWhereInput;
    orderBy?: Prisma.StylePreferencesOrderByWithRelationInput | Prisma.StylePreferencesOrderByWithRelationInput[];
    cursor?: Prisma.StylePreferencesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StylePreferencesScalarFieldEnum | Prisma.StylePreferencesScalarFieldEnum[];
};
export type StylePreferencesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StylePreferencesSelect<ExtArgs> | null;
    omit?: Prisma.StylePreferencesOmit<ExtArgs> | null;
    include?: Prisma.StylePreferencesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StylePreferencesCreateInput, Prisma.StylePreferencesUncheckedCreateInput>;
};
export type StylePreferencesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StylePreferencesCreateManyInput | Prisma.StylePreferencesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StylePreferencesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StylePreferencesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StylePreferencesOmit<ExtArgs> | null;
    data: Prisma.StylePreferencesCreateManyInput | Prisma.StylePreferencesCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.StylePreferencesIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type StylePreferencesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StylePreferencesSelect<ExtArgs> | null;
    omit?: Prisma.StylePreferencesOmit<ExtArgs> | null;
    include?: Prisma.StylePreferencesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StylePreferencesUpdateInput, Prisma.StylePreferencesUncheckedUpdateInput>;
    where: Prisma.StylePreferencesWhereUniqueInput;
};
export type StylePreferencesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StylePreferencesUpdateManyMutationInput, Prisma.StylePreferencesUncheckedUpdateManyInput>;
    where?: Prisma.StylePreferencesWhereInput;
    limit?: number;
};
export type StylePreferencesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StylePreferencesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StylePreferencesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StylePreferencesUpdateManyMutationInput, Prisma.StylePreferencesUncheckedUpdateManyInput>;
    where?: Prisma.StylePreferencesWhereInput;
    limit?: number;
    include?: Prisma.StylePreferencesIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type StylePreferencesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StylePreferencesSelect<ExtArgs> | null;
    omit?: Prisma.StylePreferencesOmit<ExtArgs> | null;
    include?: Prisma.StylePreferencesInclude<ExtArgs> | null;
    where: Prisma.StylePreferencesWhereUniqueInput;
    create: Prisma.XOR<Prisma.StylePreferencesCreateInput, Prisma.StylePreferencesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.StylePreferencesUpdateInput, Prisma.StylePreferencesUncheckedUpdateInput>;
};
export type StylePreferencesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StylePreferencesSelect<ExtArgs> | null;
    omit?: Prisma.StylePreferencesOmit<ExtArgs> | null;
    include?: Prisma.StylePreferencesInclude<ExtArgs> | null;
    where: Prisma.StylePreferencesWhereUniqueInput;
};
export type StylePreferencesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StylePreferencesWhereInput;
    limit?: number;
};
export type StylePreferencesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StylePreferencesSelect<ExtArgs> | null;
    omit?: Prisma.StylePreferencesOmit<ExtArgs> | null;
    include?: Prisma.StylePreferencesInclude<ExtArgs> | null;
};
