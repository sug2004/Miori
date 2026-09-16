import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CharacterProfileModel = runtime.Types.Result.DefaultSelection<Prisma.$CharacterProfilePayload>;
export type AggregateCharacterProfile = {
    _count: CharacterProfileCountAggregateOutputType | null;
    _min: CharacterProfileMinAggregateOutputType | null;
    _max: CharacterProfileMaxAggregateOutputType | null;
};
export type CharacterProfileMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    greeting: string | null;
    avatarUrl: string | null;
    isDefault: boolean | null;
    createdAt: Date | null;
};
export type CharacterProfileMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    greeting: string | null;
    avatarUrl: string | null;
    isDefault: boolean | null;
    createdAt: Date | null;
};
export type CharacterProfileCountAggregateOutputType = {
    id: number;
    name: number;
    personality: number;
    greeting: number;
    avatarUrl: number;
    isDefault: number;
    createdAt: number;
    _all: number;
};
export type CharacterProfileMinAggregateInputType = {
    id?: true;
    name?: true;
    greeting?: true;
    avatarUrl?: true;
    isDefault?: true;
    createdAt?: true;
};
export type CharacterProfileMaxAggregateInputType = {
    id?: true;
    name?: true;
    greeting?: true;
    avatarUrl?: true;
    isDefault?: true;
    createdAt?: true;
};
export type CharacterProfileCountAggregateInputType = {
    id?: true;
    name?: true;
    personality?: true;
    greeting?: true;
    avatarUrl?: true;
    isDefault?: true;
    createdAt?: true;
    _all?: true;
};
export type CharacterProfileAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CharacterProfileWhereInput;
    orderBy?: Prisma.CharacterProfileOrderByWithRelationInput | Prisma.CharacterProfileOrderByWithRelationInput[];
    cursor?: Prisma.CharacterProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CharacterProfileCountAggregateInputType;
    _min?: CharacterProfileMinAggregateInputType;
    _max?: CharacterProfileMaxAggregateInputType;
};
export type GetCharacterProfileAggregateType<T extends CharacterProfileAggregateArgs> = {
    [P in keyof T & keyof AggregateCharacterProfile]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCharacterProfile[P]> : Prisma.GetScalarType<T[P], AggregateCharacterProfile[P]>;
};
export type CharacterProfileGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CharacterProfileWhereInput;
    orderBy?: Prisma.CharacterProfileOrderByWithAggregationInput | Prisma.CharacterProfileOrderByWithAggregationInput[];
    by: Prisma.CharacterProfileScalarFieldEnum[] | Prisma.CharacterProfileScalarFieldEnum;
    having?: Prisma.CharacterProfileScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CharacterProfileCountAggregateInputType | true;
    _min?: CharacterProfileMinAggregateInputType;
    _max?: CharacterProfileMaxAggregateInputType;
};
export type CharacterProfileGroupByOutputType = {
    id: string;
    name: string;
    personality: runtime.JsonValue | null;
    greeting: string | null;
    avatarUrl: string | null;
    isDefault: boolean;
    createdAt: Date;
    _count: CharacterProfileCountAggregateOutputType | null;
    _min: CharacterProfileMinAggregateOutputType | null;
    _max: CharacterProfileMaxAggregateOutputType | null;
};
export type GetCharacterProfileGroupByPayload<T extends CharacterProfileGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CharacterProfileGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CharacterProfileGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CharacterProfileGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CharacterProfileGroupByOutputType[P]>;
}>>;
export type CharacterProfileWhereInput = {
    AND?: Prisma.CharacterProfileWhereInput | Prisma.CharacterProfileWhereInput[];
    OR?: Prisma.CharacterProfileWhereInput[];
    NOT?: Prisma.CharacterProfileWhereInput | Prisma.CharacterProfileWhereInput[];
    id?: Prisma.StringFilter<"CharacterProfile"> | string;
    name?: Prisma.StringFilter<"CharacterProfile"> | string;
    personality?: Prisma.JsonNullableFilter<"CharacterProfile">;
    greeting?: Prisma.StringNullableFilter<"CharacterProfile"> | string | null;
    avatarUrl?: Prisma.StringNullableFilter<"CharacterProfile"> | string | null;
    isDefault?: Prisma.BoolFilter<"CharacterProfile"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"CharacterProfile"> | Date | string;
};
export type CharacterProfileOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    personality?: Prisma.SortOrderInput | Prisma.SortOrder;
    greeting?: Prisma.SortOrderInput | Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    isDefault?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CharacterProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CharacterProfileWhereInput | Prisma.CharacterProfileWhereInput[];
    OR?: Prisma.CharacterProfileWhereInput[];
    NOT?: Prisma.CharacterProfileWhereInput | Prisma.CharacterProfileWhereInput[];
    name?: Prisma.StringFilter<"CharacterProfile"> | string;
    personality?: Prisma.JsonNullableFilter<"CharacterProfile">;
    greeting?: Prisma.StringNullableFilter<"CharacterProfile"> | string | null;
    avatarUrl?: Prisma.StringNullableFilter<"CharacterProfile"> | string | null;
    isDefault?: Prisma.BoolFilter<"CharacterProfile"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"CharacterProfile"> | Date | string;
}, "id">;
export type CharacterProfileOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    personality?: Prisma.SortOrderInput | Prisma.SortOrder;
    greeting?: Prisma.SortOrderInput | Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    isDefault?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CharacterProfileCountOrderByAggregateInput;
    _max?: Prisma.CharacterProfileMaxOrderByAggregateInput;
    _min?: Prisma.CharacterProfileMinOrderByAggregateInput;
};
export type CharacterProfileScalarWhereWithAggregatesInput = {
    AND?: Prisma.CharacterProfileScalarWhereWithAggregatesInput | Prisma.CharacterProfileScalarWhereWithAggregatesInput[];
    OR?: Prisma.CharacterProfileScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CharacterProfileScalarWhereWithAggregatesInput | Prisma.CharacterProfileScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CharacterProfile"> | string;
    name?: Prisma.StringWithAggregatesFilter<"CharacterProfile"> | string;
    personality?: Prisma.JsonNullableWithAggregatesFilter<"CharacterProfile">;
    greeting?: Prisma.StringNullableWithAggregatesFilter<"CharacterProfile"> | string | null;
    avatarUrl?: Prisma.StringNullableWithAggregatesFilter<"CharacterProfile"> | string | null;
    isDefault?: Prisma.BoolWithAggregatesFilter<"CharacterProfile"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CharacterProfile"> | Date | string;
};
export type CharacterProfileCreateInput = {
    id?: string;
    name: string;
    personality?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    greeting?: string | null;
    avatarUrl?: string | null;
    isDefault?: boolean;
    createdAt?: Date | string;
};
export type CharacterProfileUncheckedCreateInput = {
    id?: string;
    name: string;
    personality?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    greeting?: string | null;
    avatarUrl?: string | null;
    isDefault?: boolean;
    createdAt?: Date | string;
};
export type CharacterProfileUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    personality?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    greeting?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CharacterProfileUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    personality?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    greeting?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CharacterProfileCreateManyInput = {
    id?: string;
    name: string;
    personality?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    greeting?: string | null;
    avatarUrl?: string | null;
    isDefault?: boolean;
    createdAt?: Date | string;
};
export type CharacterProfileUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    personality?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    greeting?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CharacterProfileUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    personality?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    greeting?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CharacterProfileCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    personality?: Prisma.SortOrder;
    greeting?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    isDefault?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CharacterProfileMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    greeting?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    isDefault?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CharacterProfileMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    greeting?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    isDefault?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CharacterProfileSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    personality?: boolean;
    greeting?: boolean;
    avatarUrl?: boolean;
    isDefault?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["characterProfile"]>;
export type CharacterProfileSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    personality?: boolean;
    greeting?: boolean;
    avatarUrl?: boolean;
    isDefault?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["characterProfile"]>;
export type CharacterProfileSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    personality?: boolean;
    greeting?: boolean;
    avatarUrl?: boolean;
    isDefault?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["characterProfile"]>;
export type CharacterProfileSelectScalar = {
    id?: boolean;
    name?: boolean;
    personality?: boolean;
    greeting?: boolean;
    avatarUrl?: boolean;
    isDefault?: boolean;
    createdAt?: boolean;
};
export type CharacterProfileOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "personality" | "greeting" | "avatarUrl" | "isDefault" | "createdAt", ExtArgs["result"]["characterProfile"]>;
export type $CharacterProfilePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CharacterProfile";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        personality: runtime.JsonValue | null;
        greeting: string | null;
        avatarUrl: string | null;
        isDefault: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["characterProfile"]>;
    composites: {};
};
export type CharacterProfileGetPayload<S extends boolean | null | undefined | CharacterProfileDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CharacterProfilePayload, S>;
export type CharacterProfileCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CharacterProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CharacterProfileCountAggregateInputType | true;
};
export interface CharacterProfileDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CharacterProfile'];
        meta: {
            name: 'CharacterProfile';
        };
    };
    findUnique<T extends CharacterProfileFindUniqueArgs>(args: Prisma.SelectSubset<T, CharacterProfileFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CharacterProfileClient<runtime.Types.Result.GetResult<Prisma.$CharacterProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CharacterProfileFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CharacterProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CharacterProfileClient<runtime.Types.Result.GetResult<Prisma.$CharacterProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CharacterProfileFindFirstArgs>(args?: Prisma.SelectSubset<T, CharacterProfileFindFirstArgs<ExtArgs>>): Prisma.Prisma__CharacterProfileClient<runtime.Types.Result.GetResult<Prisma.$CharacterProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CharacterProfileFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CharacterProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CharacterProfileClient<runtime.Types.Result.GetResult<Prisma.$CharacterProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CharacterProfileFindManyArgs>(args?: Prisma.SelectSubset<T, CharacterProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CharacterProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CharacterProfileCreateArgs>(args: Prisma.SelectSubset<T, CharacterProfileCreateArgs<ExtArgs>>): Prisma.Prisma__CharacterProfileClient<runtime.Types.Result.GetResult<Prisma.$CharacterProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CharacterProfileCreateManyArgs>(args?: Prisma.SelectSubset<T, CharacterProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CharacterProfileCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CharacterProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CharacterProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CharacterProfileDeleteArgs>(args: Prisma.SelectSubset<T, CharacterProfileDeleteArgs<ExtArgs>>): Prisma.Prisma__CharacterProfileClient<runtime.Types.Result.GetResult<Prisma.$CharacterProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CharacterProfileUpdateArgs>(args: Prisma.SelectSubset<T, CharacterProfileUpdateArgs<ExtArgs>>): Prisma.Prisma__CharacterProfileClient<runtime.Types.Result.GetResult<Prisma.$CharacterProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CharacterProfileDeleteManyArgs>(args?: Prisma.SelectSubset<T, CharacterProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CharacterProfileUpdateManyArgs>(args: Prisma.SelectSubset<T, CharacterProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CharacterProfileUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CharacterProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CharacterProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CharacterProfileUpsertArgs>(args: Prisma.SelectSubset<T, CharacterProfileUpsertArgs<ExtArgs>>): Prisma.Prisma__CharacterProfileClient<runtime.Types.Result.GetResult<Prisma.$CharacterProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CharacterProfileCountArgs>(args?: Prisma.Subset<T, CharacterProfileCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CharacterProfileCountAggregateOutputType> : number>;
    aggregate<T extends CharacterProfileAggregateArgs>(args: Prisma.Subset<T, CharacterProfileAggregateArgs>): Prisma.PrismaPromise<GetCharacterProfileAggregateType<T>>;
    groupBy<T extends CharacterProfileGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CharacterProfileGroupByArgs['orderBy'];
    } : {
        orderBy?: CharacterProfileGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CharacterProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCharacterProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CharacterProfileFieldRefs;
}
export interface Prisma__CharacterProfileClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CharacterProfileFieldRefs {
    readonly id: Prisma.FieldRef<"CharacterProfile", 'String'>;
    readonly name: Prisma.FieldRef<"CharacterProfile", 'String'>;
    readonly personality: Prisma.FieldRef<"CharacterProfile", 'Json'>;
    readonly greeting: Prisma.FieldRef<"CharacterProfile", 'String'>;
    readonly avatarUrl: Prisma.FieldRef<"CharacterProfile", 'String'>;
    readonly isDefault: Prisma.FieldRef<"CharacterProfile", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"CharacterProfile", 'DateTime'>;
}
export type CharacterProfileFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CharacterProfileSelect<ExtArgs> | null;
    omit?: Prisma.CharacterProfileOmit<ExtArgs> | null;
    where: Prisma.CharacterProfileWhereUniqueInput;
};
export type CharacterProfileFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CharacterProfileSelect<ExtArgs> | null;
    omit?: Prisma.CharacterProfileOmit<ExtArgs> | null;
    where: Prisma.CharacterProfileWhereUniqueInput;
};
export type CharacterProfileFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CharacterProfileSelect<ExtArgs> | null;
    omit?: Prisma.CharacterProfileOmit<ExtArgs> | null;
    where?: Prisma.CharacterProfileWhereInput;
    orderBy?: Prisma.CharacterProfileOrderByWithRelationInput | Prisma.CharacterProfileOrderByWithRelationInput[];
    cursor?: Prisma.CharacterProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CharacterProfileScalarFieldEnum | Prisma.CharacterProfileScalarFieldEnum[];
};
export type CharacterProfileFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CharacterProfileSelect<ExtArgs> | null;
    omit?: Prisma.CharacterProfileOmit<ExtArgs> | null;
    where?: Prisma.CharacterProfileWhereInput;
    orderBy?: Prisma.CharacterProfileOrderByWithRelationInput | Prisma.CharacterProfileOrderByWithRelationInput[];
    cursor?: Prisma.CharacterProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CharacterProfileScalarFieldEnum | Prisma.CharacterProfileScalarFieldEnum[];
};
export type CharacterProfileFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CharacterProfileSelect<ExtArgs> | null;
    omit?: Prisma.CharacterProfileOmit<ExtArgs> | null;
    where?: Prisma.CharacterProfileWhereInput;
    orderBy?: Prisma.CharacterProfileOrderByWithRelationInput | Prisma.CharacterProfileOrderByWithRelationInput[];
    cursor?: Prisma.CharacterProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CharacterProfileScalarFieldEnum | Prisma.CharacterProfileScalarFieldEnum[];
};
export type CharacterProfileCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CharacterProfileSelect<ExtArgs> | null;
    omit?: Prisma.CharacterProfileOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CharacterProfileCreateInput, Prisma.CharacterProfileUncheckedCreateInput>;
};
export type CharacterProfileCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CharacterProfileCreateManyInput | Prisma.CharacterProfileCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CharacterProfileCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CharacterProfileSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CharacterProfileOmit<ExtArgs> | null;
    data: Prisma.CharacterProfileCreateManyInput | Prisma.CharacterProfileCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CharacterProfileUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CharacterProfileSelect<ExtArgs> | null;
    omit?: Prisma.CharacterProfileOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CharacterProfileUpdateInput, Prisma.CharacterProfileUncheckedUpdateInput>;
    where: Prisma.CharacterProfileWhereUniqueInput;
};
export type CharacterProfileUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CharacterProfileUpdateManyMutationInput, Prisma.CharacterProfileUncheckedUpdateManyInput>;
    where?: Prisma.CharacterProfileWhereInput;
    limit?: number;
};
export type CharacterProfileUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CharacterProfileSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CharacterProfileOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CharacterProfileUpdateManyMutationInput, Prisma.CharacterProfileUncheckedUpdateManyInput>;
    where?: Prisma.CharacterProfileWhereInput;
    limit?: number;
};
export type CharacterProfileUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CharacterProfileSelect<ExtArgs> | null;
    omit?: Prisma.CharacterProfileOmit<ExtArgs> | null;
    where: Prisma.CharacterProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.CharacterProfileCreateInput, Prisma.CharacterProfileUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CharacterProfileUpdateInput, Prisma.CharacterProfileUncheckedUpdateInput>;
};
export type CharacterProfileDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CharacterProfileSelect<ExtArgs> | null;
    omit?: Prisma.CharacterProfileOmit<ExtArgs> | null;
    where: Prisma.CharacterProfileWhereUniqueInput;
};
export type CharacterProfileDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CharacterProfileWhereInput;
    limit?: number;
};
export type CharacterProfileDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CharacterProfileSelect<ExtArgs> | null;
    omit?: Prisma.CharacterProfileOmit<ExtArgs> | null;
};
