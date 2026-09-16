import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserProfileModel = runtime.Types.Result.DefaultSelection<Prisma.$UserProfilePayload>;
export type AggregateUserProfile = {
    _count: UserProfileCountAggregateOutputType | null;
    _min: UserProfileMinAggregateOutputType | null;
    _max: UserProfileMaxAggregateOutputType | null;
};
export type UserProfileMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    displayName: string | null;
    avatarUrl: string | null;
    bio: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserProfileMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    displayName: string | null;
    avatarUrl: string | null;
    bio: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserProfileCountAggregateOutputType = {
    id: number;
    userId: number;
    displayName: number;
    avatarUrl: number;
    bio: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserProfileMinAggregateInputType = {
    id?: true;
    userId?: true;
    displayName?: true;
    avatarUrl?: true;
    bio?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserProfileMaxAggregateInputType = {
    id?: true;
    userId?: true;
    displayName?: true;
    avatarUrl?: true;
    bio?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserProfileCountAggregateInputType = {
    id?: true;
    userId?: true;
    displayName?: true;
    avatarUrl?: true;
    bio?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserProfileAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserProfileWhereInput;
    orderBy?: Prisma.UserProfileOrderByWithRelationInput | Prisma.UserProfileOrderByWithRelationInput[];
    cursor?: Prisma.UserProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserProfileCountAggregateInputType;
    _min?: UserProfileMinAggregateInputType;
    _max?: UserProfileMaxAggregateInputType;
};
export type GetUserProfileAggregateType<T extends UserProfileAggregateArgs> = {
    [P in keyof T & keyof AggregateUserProfile]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserProfile[P]> : Prisma.GetScalarType<T[P], AggregateUserProfile[P]>;
};
export type UserProfileGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserProfileWhereInput;
    orderBy?: Prisma.UserProfileOrderByWithAggregationInput | Prisma.UserProfileOrderByWithAggregationInput[];
    by: Prisma.UserProfileScalarFieldEnum[] | Prisma.UserProfileScalarFieldEnum;
    having?: Prisma.UserProfileScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserProfileCountAggregateInputType | true;
    _min?: UserProfileMinAggregateInputType;
    _max?: UserProfileMaxAggregateInputType;
};
export type UserProfileGroupByOutputType = {
    id: string;
    userId: string;
    displayName: string | null;
    avatarUrl: string | null;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserProfileCountAggregateOutputType | null;
    _min: UserProfileMinAggregateOutputType | null;
    _max: UserProfileMaxAggregateOutputType | null;
};
export type GetUserProfileGroupByPayload<T extends UserProfileGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserProfileGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserProfileGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserProfileGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserProfileGroupByOutputType[P]>;
}>>;
export type UserProfileWhereInput = {
    AND?: Prisma.UserProfileWhereInput | Prisma.UserProfileWhereInput[];
    OR?: Prisma.UserProfileWhereInput[];
    NOT?: Prisma.UserProfileWhereInput | Prisma.UserProfileWhereInput[];
    id?: Prisma.StringFilter<"UserProfile"> | string;
    userId?: Prisma.StringFilter<"UserProfile"> | string;
    displayName?: Prisma.StringNullableFilter<"UserProfile"> | string | null;
    avatarUrl?: Prisma.StringNullableFilter<"UserProfile"> | string | null;
    bio?: Prisma.StringNullableFilter<"UserProfile"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"UserProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserProfile"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type UserProfileOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrderInput | Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    bio?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type UserProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.UserProfileWhereInput | Prisma.UserProfileWhereInput[];
    OR?: Prisma.UserProfileWhereInput[];
    NOT?: Prisma.UserProfileWhereInput | Prisma.UserProfileWhereInput[];
    displayName?: Prisma.StringNullableFilter<"UserProfile"> | string | null;
    avatarUrl?: Prisma.StringNullableFilter<"UserProfile"> | string | null;
    bio?: Prisma.StringNullableFilter<"UserProfile"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"UserProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserProfile"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type UserProfileOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrderInput | Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    bio?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserProfileCountOrderByAggregateInput;
    _max?: Prisma.UserProfileMaxOrderByAggregateInput;
    _min?: Prisma.UserProfileMinOrderByAggregateInput;
};
export type UserProfileScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserProfileScalarWhereWithAggregatesInput | Prisma.UserProfileScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserProfileScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserProfileScalarWhereWithAggregatesInput | Prisma.UserProfileScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"UserProfile"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"UserProfile"> | string;
    displayName?: Prisma.StringNullableWithAggregatesFilter<"UserProfile"> | string | null;
    avatarUrl?: Prisma.StringNullableWithAggregatesFilter<"UserProfile"> | string | null;
    bio?: Prisma.StringNullableWithAggregatesFilter<"UserProfile"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"UserProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"UserProfile"> | Date | string;
};
export type UserProfileCreateInput = {
    id?: string;
    displayName?: string | null;
    avatarUrl?: string | null;
    bio?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutProfileInput;
};
export type UserProfileUncheckedCreateInput = {
    id?: string;
    userId: string;
    displayName?: string | null;
    avatarUrl?: string | null;
    bio?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserProfileUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutProfileNestedInput;
};
export type UserProfileUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserProfileCreateManyInput = {
    id?: string;
    userId: string;
    displayName?: string | null;
    avatarUrl?: string | null;
    bio?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserProfileUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserProfileUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserProfileNullableScalarRelationFilter = {
    is?: Prisma.UserProfileWhereInput | null;
    isNot?: Prisma.UserProfileWhereInput | null;
};
export type UserProfileCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserProfileMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserProfileMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserProfileCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserProfileCreateWithoutUserInput, Prisma.UserProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserProfileCreateOrConnectWithoutUserInput;
    connect?: Prisma.UserProfileWhereUniqueInput;
};
export type UserProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserProfileCreateWithoutUserInput, Prisma.UserProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserProfileCreateOrConnectWithoutUserInput;
    connect?: Prisma.UserProfileWhereUniqueInput;
};
export type UserProfileUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserProfileCreateWithoutUserInput, Prisma.UserProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserProfileCreateOrConnectWithoutUserInput;
    upsert?: Prisma.UserProfileUpsertWithoutUserInput;
    disconnect?: Prisma.UserProfileWhereInput | boolean;
    delete?: Prisma.UserProfileWhereInput | boolean;
    connect?: Prisma.UserProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserProfileUpdateToOneWithWhereWithoutUserInput, Prisma.UserProfileUpdateWithoutUserInput>, Prisma.UserProfileUncheckedUpdateWithoutUserInput>;
};
export type UserProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserProfileCreateWithoutUserInput, Prisma.UserProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserProfileCreateOrConnectWithoutUserInput;
    upsert?: Prisma.UserProfileUpsertWithoutUserInput;
    disconnect?: Prisma.UserProfileWhereInput | boolean;
    delete?: Prisma.UserProfileWhereInput | boolean;
    connect?: Prisma.UserProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserProfileUpdateToOneWithWhereWithoutUserInput, Prisma.UserProfileUpdateWithoutUserInput>, Prisma.UserProfileUncheckedUpdateWithoutUserInput>;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type UserProfileCreateWithoutUserInput = {
    id?: string;
    displayName?: string | null;
    avatarUrl?: string | null;
    bio?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserProfileUncheckedCreateWithoutUserInput = {
    id?: string;
    displayName?: string | null;
    avatarUrl?: string | null;
    bio?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserProfileCreateOrConnectWithoutUserInput = {
    where: Prisma.UserProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserProfileCreateWithoutUserInput, Prisma.UserProfileUncheckedCreateWithoutUserInput>;
};
export type UserProfileUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.UserProfileUpdateWithoutUserInput, Prisma.UserProfileUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UserProfileCreateWithoutUserInput, Prisma.UserProfileUncheckedCreateWithoutUserInput>;
    where?: Prisma.UserProfileWhereInput;
};
export type UserProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.UserProfileWhereInput;
    data: Prisma.XOR<Prisma.UserProfileUpdateWithoutUserInput, Prisma.UserProfileUncheckedUpdateWithoutUserInput>;
};
export type UserProfileUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserProfileUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserProfileSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    displayName?: boolean;
    avatarUrl?: boolean;
    bio?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userProfile"]>;
export type UserProfileSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    displayName?: boolean;
    avatarUrl?: boolean;
    bio?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userProfile"]>;
export type UserProfileSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    displayName?: boolean;
    avatarUrl?: boolean;
    bio?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userProfile"]>;
export type UserProfileSelectScalar = {
    id?: boolean;
    userId?: boolean;
    displayName?: boolean;
    avatarUrl?: boolean;
    bio?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserProfileOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "displayName" | "avatarUrl" | "bio" | "createdAt" | "updatedAt", ExtArgs["result"]["userProfile"]>;
export type UserProfileInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserProfileIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserProfileIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $UserProfilePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserProfile";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        displayName: string | null;
        avatarUrl: string | null;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["userProfile"]>;
    composites: {};
};
export type UserProfileGetPayload<S extends boolean | null | undefined | UserProfileDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserProfilePayload, S>;
export type UserProfileCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserProfileCountAggregateInputType | true;
};
export interface UserProfileDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserProfile'];
        meta: {
            name: 'UserProfile';
        };
    };
    findUnique<T extends UserProfileFindUniqueArgs>(args: Prisma.SelectSubset<T, UserProfileFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserProfileClient<runtime.Types.Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserProfileFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserProfileClient<runtime.Types.Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserProfileFindFirstArgs>(args?: Prisma.SelectSubset<T, UserProfileFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserProfileClient<runtime.Types.Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserProfileFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserProfileClient<runtime.Types.Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserProfileFindManyArgs>(args?: Prisma.SelectSubset<T, UserProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserProfileCreateArgs>(args: Prisma.SelectSubset<T, UserProfileCreateArgs<ExtArgs>>): Prisma.Prisma__UserProfileClient<runtime.Types.Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserProfileCreateManyArgs>(args?: Prisma.SelectSubset<T, UserProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserProfileCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserProfileDeleteArgs>(args: Prisma.SelectSubset<T, UserProfileDeleteArgs<ExtArgs>>): Prisma.Prisma__UserProfileClient<runtime.Types.Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserProfileUpdateArgs>(args: Prisma.SelectSubset<T, UserProfileUpdateArgs<ExtArgs>>): Prisma.Prisma__UserProfileClient<runtime.Types.Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserProfileDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserProfileUpdateManyArgs>(args: Prisma.SelectSubset<T, UserProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserProfileUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserProfileUpsertArgs>(args: Prisma.SelectSubset<T, UserProfileUpsertArgs<ExtArgs>>): Prisma.Prisma__UserProfileClient<runtime.Types.Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserProfileCountArgs>(args?: Prisma.Subset<T, UserProfileCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserProfileCountAggregateOutputType> : number>;
    aggregate<T extends UserProfileAggregateArgs>(args: Prisma.Subset<T, UserProfileAggregateArgs>): Prisma.PrismaPromise<GetUserProfileAggregateType<T>>;
    groupBy<T extends UserProfileGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserProfileGroupByArgs['orderBy'];
    } : {
        orderBy?: UserProfileGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserProfileFieldRefs;
}
export interface Prisma__UserProfileClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserProfileFieldRefs {
    readonly id: Prisma.FieldRef<"UserProfile", 'String'>;
    readonly userId: Prisma.FieldRef<"UserProfile", 'String'>;
    readonly displayName: Prisma.FieldRef<"UserProfile", 'String'>;
    readonly avatarUrl: Prisma.FieldRef<"UserProfile", 'String'>;
    readonly bio: Prisma.FieldRef<"UserProfile", 'String'>;
    readonly createdAt: Prisma.FieldRef<"UserProfile", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"UserProfile", 'DateTime'>;
}
export type UserProfileFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserProfileSelect<ExtArgs> | null;
    omit?: Prisma.UserProfileOmit<ExtArgs> | null;
    include?: Prisma.UserProfileInclude<ExtArgs> | null;
    where: Prisma.UserProfileWhereUniqueInput;
};
export type UserProfileFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserProfileSelect<ExtArgs> | null;
    omit?: Prisma.UserProfileOmit<ExtArgs> | null;
    include?: Prisma.UserProfileInclude<ExtArgs> | null;
    where: Prisma.UserProfileWhereUniqueInput;
};
export type UserProfileFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserProfileSelect<ExtArgs> | null;
    omit?: Prisma.UserProfileOmit<ExtArgs> | null;
    include?: Prisma.UserProfileInclude<ExtArgs> | null;
    where?: Prisma.UserProfileWhereInput;
    orderBy?: Prisma.UserProfileOrderByWithRelationInput | Prisma.UserProfileOrderByWithRelationInput[];
    cursor?: Prisma.UserProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserProfileScalarFieldEnum | Prisma.UserProfileScalarFieldEnum[];
};
export type UserProfileFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserProfileSelect<ExtArgs> | null;
    omit?: Prisma.UserProfileOmit<ExtArgs> | null;
    include?: Prisma.UserProfileInclude<ExtArgs> | null;
    where?: Prisma.UserProfileWhereInput;
    orderBy?: Prisma.UserProfileOrderByWithRelationInput | Prisma.UserProfileOrderByWithRelationInput[];
    cursor?: Prisma.UserProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserProfileScalarFieldEnum | Prisma.UserProfileScalarFieldEnum[];
};
export type UserProfileFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserProfileSelect<ExtArgs> | null;
    omit?: Prisma.UserProfileOmit<ExtArgs> | null;
    include?: Prisma.UserProfileInclude<ExtArgs> | null;
    where?: Prisma.UserProfileWhereInput;
    orderBy?: Prisma.UserProfileOrderByWithRelationInput | Prisma.UserProfileOrderByWithRelationInput[];
    cursor?: Prisma.UserProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserProfileScalarFieldEnum | Prisma.UserProfileScalarFieldEnum[];
};
export type UserProfileCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserProfileSelect<ExtArgs> | null;
    omit?: Prisma.UserProfileOmit<ExtArgs> | null;
    include?: Prisma.UserProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserProfileCreateInput, Prisma.UserProfileUncheckedCreateInput>;
};
export type UserProfileCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserProfileCreateManyInput | Prisma.UserProfileCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserProfileCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserProfileSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserProfileOmit<ExtArgs> | null;
    data: Prisma.UserProfileCreateManyInput | Prisma.UserProfileCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UserProfileIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UserProfileUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserProfileSelect<ExtArgs> | null;
    omit?: Prisma.UserProfileOmit<ExtArgs> | null;
    include?: Prisma.UserProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserProfileUpdateInput, Prisma.UserProfileUncheckedUpdateInput>;
    where: Prisma.UserProfileWhereUniqueInput;
};
export type UserProfileUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserProfileUpdateManyMutationInput, Prisma.UserProfileUncheckedUpdateManyInput>;
    where?: Prisma.UserProfileWhereInput;
    limit?: number;
};
export type UserProfileUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserProfileSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserProfileOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserProfileUpdateManyMutationInput, Prisma.UserProfileUncheckedUpdateManyInput>;
    where?: Prisma.UserProfileWhereInput;
    limit?: number;
    include?: Prisma.UserProfileIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UserProfileUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserProfileSelect<ExtArgs> | null;
    omit?: Prisma.UserProfileOmit<ExtArgs> | null;
    include?: Prisma.UserProfileInclude<ExtArgs> | null;
    where: Prisma.UserProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserProfileCreateInput, Prisma.UserProfileUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserProfileUpdateInput, Prisma.UserProfileUncheckedUpdateInput>;
};
export type UserProfileDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserProfileSelect<ExtArgs> | null;
    omit?: Prisma.UserProfileOmit<ExtArgs> | null;
    include?: Prisma.UserProfileInclude<ExtArgs> | null;
    where: Prisma.UserProfileWhereUniqueInput;
};
export type UserProfileDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserProfileWhereInput;
    limit?: number;
};
export type UserProfileDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserProfileSelect<ExtArgs> | null;
    omit?: Prisma.UserProfileOmit<ExtArgs> | null;
    include?: Prisma.UserProfileInclude<ExtArgs> | null;
};
