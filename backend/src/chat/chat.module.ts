import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller.js';
import { ChatService } from './chat.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { WardrobeModule } from '../wardrobe/wardrobe.module.js';
import { OutfitModule } from '../outfit/outfit.module.js';
import { AiModule } from '../ai/ai.module.js';

@Module({
  imports: [PrismaModule, AuthModule, WardrobeModule, OutfitModule, AiModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
