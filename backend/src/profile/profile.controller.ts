import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { User } from '../generated/prisma/client.js';
import { UploadsService } from '../uploads/uploads.service.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { StylePreferencesDto } from './dto/style-preferences.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { ProfileService } from './profile.service.js';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly uploadsService: UploadsService,
  ) {}

  @Get()
  overview(@CurrentUser() user: User) {
    return this.profileService.overview(user.id);
  }

  @Patch()
  update(@CurrentUser() user: User, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(user.id, dto);
  }

  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }),
  )
  async uploadAvatar(@CurrentUser() user: User, @UploadedFile() file?: { buffer: Buffer; originalname?: string; mimetype?: string; size: number }) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const image = await this.uploadsService.uploadImage(file);
    return this.profileService.updateAvatar(user.id, image.url);
  }

  @Get('style-preferences')
  stylePreferences(@CurrentUser() user: User) {
    return this.profileService.getStylePreferences(user.id);
  }

  @Put('style-preferences')
  setStylePreferences(
    @CurrentUser() user: User,
    @Body() dto: StylePreferencesDto,
  ) {
    return this.profileService.upsertStylePreferences(user.id, dto);
  }
}