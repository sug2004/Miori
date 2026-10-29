import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { InspirationController } from './inspiration.controller.js';
import { InspirationService } from './inspiration.service.js';

@Module({
  imports: [AuthModule],
  controllers: [InspirationController],
  providers: [InspirationService],
})
export class InspirationModule {}
