import { Module } from '@nestjs/common';
import { AiModule } from '../ai/ai.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { UploadsModule } from '../uploads/uploads.module.js';
import { WardrobeController } from './wardrobe.controller.js';
import { WardrobeService } from './wardrobe.service.js';

@Module({
  imports: [AuthModule, UploadsModule, AiModule],
  controllers: [WardrobeController],
  providers: [WardrobeService],
})
export class WardrobeModule {}
