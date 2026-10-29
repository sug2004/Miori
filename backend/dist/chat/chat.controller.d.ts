import { ChatService } from './chat.service.js';
type AuthUser = {
    id: string;
};
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getConversation(user: AuthUser): Promise<{
        id: string;
        userId: string;
        title: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getMessages(user: AuthUser, id: string): Promise<{
        id: string;
        createdAt: Date;
        conversationId: string;
        role: import("../generated/prisma/enums.js").Role;
        content: import("@prisma/client/runtime/client").JsonValue;
    }[]>;
    sendMessage(user: AuthUser, body: {
        content: string;
    }): Promise<{
        conversationId: string;
        userMessage: {
            id: string;
            createdAt: Date;
            conversationId: string;
            role: import("../generated/prisma/enums.js").Role;
            content: import("@prisma/client/runtime/client").JsonValue;
        };
        assistantMessage: {
            id: string;
            createdAt: Date;
            conversationId: string;
            role: import("../generated/prisma/enums.js").Role;
            content: import("@prisma/client/runtime/client").JsonValue;
        };
    }>;
    listConversations(user: AuthUser): Promise<({
        messages: {
            id: string;
            createdAt: Date;
            conversationId: string;
            role: import("../generated/prisma/enums.js").Role;
            content: import("@prisma/client/runtime/client").JsonValue;
        }[];
    } & {
        id: string;
        userId: string;
        title: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
export {};
