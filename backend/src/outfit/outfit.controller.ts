import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { OutfitService } from './outfit.service.js';
import { GenerateOutfitDto } from './dto/generate-outfit.dto.js';
import { StyleItemDto } from './dto/style-item.dto.js';
import { CreateOutfitDto } from './dto/create-outfit.dto.js';
import { UpdateOutfitDto } from './dto/update-outfit.dto.js';

type AuthUser = { id: string };

@UseGuards(JwtAuthGuard)
@Controller('outfits')
export class OutfitController {
  constructor(private readonly outfitService: OutfitService) {}

  @Post('generate')
  generate(@CurrentUser() user: AuthUser, @Body() dto: GenerateOutfitDto) {
    return this.outfitService.generate(user.id, dto.occasion, dto.useItemIds);
  }

  @Post('style-item')
  styleItem(@CurrentUser() user: AuthUser, @Body() dto: StyleItemDto) {
    return this.outfitService.styleItem(user.id, dto.wardrobeItemId);
  }

  @Get()
  list(@CurrentUser() user: AuthUser) {
    return this.outfitService.list(user.id);
  }

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateOutfitDto) {
    return this.outfitService.create(user.id, dto);
  }

  @Get(':id')
  get(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.outfitService.get(user.id, id);
  }

  @Patch(':id')
  update(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: UpdateOutfitDto) {
    return this.outfitService.update(user.id, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.outfitService.remove(user.id, id);
  }
}

