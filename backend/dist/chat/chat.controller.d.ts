import { ChatService } from './chat.service.js';
type AuthUser = {
    id: string;
};
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getConversation(user: AuthUser): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string | null;
    }>;
    getMessages(user: AuthUser, id: string): Promise<{
        id: string;
        createdAt: Date;
        content: import("@prisma/client/runtime/client").JsonValue;
        conversationId: string;
        role: import("../generated/prisma/enums.js").Role;
    }[]>;
    sendMessage(user: AuthUser, body: {
        content: string;
    }): Promise<{
        conversationId: string;
        userMessage: {
            id: string;
            createdAt: Date;
            content: import("@prisma/client/runtime/client").JsonValue;
            conversationId: string;
            role: import("../generated/prisma/enums.js").Role;
        };
        assistantMessage: {
            id: string;
            createdAt: Date;
            content: import("@prisma/client/runtime/client").JsonValue;
            conversationId: string;
            role: import("../generated/prisma/enums.js").Role;
        };
    }>;
    listConversations(user: AuthUser): Promise<({
        messages: {
            id: string;
            createdAt: Date;
            content: import("@prisma/client/runtime/client").JsonValue;
            conversationId: string;
            role: import("../generated/prisma/enums.js").Role;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string | null;
    })[]>;
}
export {};
