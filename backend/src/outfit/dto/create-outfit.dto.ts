import { IsArray, IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OutfitItemDto {
  @IsString()
  wardrobeItemId: string;

  @IsOptional()
  position?: number;
}

export class CreateOutfitDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  occasion?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OutfitItemDto)
  items: OutfitItemDto[];
}
