export declare const ItemStatus: {
    readonly DRAFT: "DRAFT";
    readonly SAVED: "SAVED";
};
export type ItemStatus = (typeof ItemStatus)[keyof typeof ItemStatus];
export declare const Role: {
    readonly USER: "USER";
    readonly ASSISTANT: "ASSISTANT";
    readonly SYSTEM: "SYSTEM";
};
export type Role = (typeof Role)[keyof typeof Role];
