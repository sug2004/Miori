import { PrismaService } from '../prisma/prisma.service.js';
import { AiService } from '../ai/ai.service.js';
export declare class ChatService {
    private prisma;
    private ai;
    private readonly logger;
    constructor(prisma: PrismaService, ai: AiService);
    getOrCreateConversation(userId: string): Promise<{
        id: string;
        userId: string;
        title: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getMessages(userId: string, conversationId: string): Promise<{
        id: string;
        createdAt: Date;
        conversationId: string;
        role: import("../generated/prisma/enums.js").Role;
        content: import("@prisma/client/runtime/client").JsonValue;
    }[]>;
    private needsWardrobe;
    private extractOccasion;
    sendMessage(userId: string, content: string): Promise<{
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
    listConversations(userId: string): Promise<({
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
