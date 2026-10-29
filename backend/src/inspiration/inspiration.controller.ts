import { Controller, Get, NotFoundException, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { InspirationService } from './inspiration.service.js';

@UseGuards(JwtAuthGuard)
@Controller('inspiration')
export class InspirationController {
  constructor(private readonly inspirationService: InspirationService) {}

  @Get()
  list(
    @Query('style') style?: string,
    @Query('occasion') occasion?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('bookmarks') bookmarks?: string,
    @Query('gender') gender?: string,
  ) {
    return this.inspirationService.list({ style, occasion, search, page, bookmarks, gender });
  }

  @Get('styles')
  styles() {
    return { styles: this.inspirationService.styles };
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.inspirationService.get(id);
  }
}
