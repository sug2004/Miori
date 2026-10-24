import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { User } from '../generated/prisma/client.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import type { ImageFile } from '../uploads/uploads.service.js';
import { CreateWardrobeItemDto } from './dto/create-wardrobe-item.dto.js';
import { UpdateWardrobeItemDto } from './dto/update-wardrobe-item.dto.js';
import { WardrobeService } from './wardrobe.service.js';

function parseBoolean(value?: string): boolean | undefined {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
}

function parseStatus(value?: string): 'DRAFT' | 'SAVED' | undefined {
  return value === 'DRAFT' || value === 'SAVED' ? value : undefined;
}

@Controller('wardrobe')
@UseGuards(JwtAuthGuard)
export class WardrobeController {
  constructor(private readonly wardrobeService: WardrobeService) {}

  @Get()
  list(
    @CurrentUser() user: User,
    @Query('category') category?: string,
    @Query('favorite') favorite?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
  ) {
    return this.wardrobeService.list(user.id, {
      category: category?.trim() || undefined,
      favorite: parseBoolean(favorite),
      status: parseStatus(status),
      search,
      sort,
    });
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024 } }),
  )
  async upload(@CurrentUser() user: User, @UploadedFile() file?: ImageFile) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.wardrobeService.createDraft(user.id, file);
  }

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateWardrobeItemDto) {
    return this.wardrobeService.create(user.id, dto);
  }

  @Get(':id')
  get(@CurrentUser() user: User, @Param('id') id: string) {
    return this.wardrobeService.get(user.id, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() dto: UpdateWardrobeItemDto,
  ) {
    return this.wardrobeService.update(user.id, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: User, @Param('id') id: string) {
    return this.wardrobeService.remove(user.id, id);
  }

  @Post(':id/wear')
  markWorn(@CurrentUser() user: User, @Param('id') id: string) {
    return this.wardrobeService.markWorn(user.id, id);
  }
}
