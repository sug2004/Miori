import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { UploadsModule } from '../uploads/uploads.module.js';
import { ProfileController } from './profile.controller.js';
import { ProfileService } from './profile.service.js';

@Module({
  imports: [AuthModule, UploadsModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}