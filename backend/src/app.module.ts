import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ProfileModule } from './profile/profile.module.js';
import { WardrobeModule } from './wardrobe/wardrobe.module.js';
import { AiModule } from './ai/ai.module.js';
import { UploadsModule } from './uploads/uploads.module.js';
import { OutfitModule } from './outfit/outfit.module.js';
import { ChatModule } from './chat/chat.module.js';
import { InspirationModule } from './inspiration/inspiration.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProfileModule,
    WardrobeModule,
    AiModule,
    UploadsModule,
    OutfitModule,
    ChatModule,
    InspirationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
