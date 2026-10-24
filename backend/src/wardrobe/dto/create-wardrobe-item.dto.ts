import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateWardrobeItemDto {
  @IsString()
  @MaxLength(2000)
  imageUrl: string;

  @IsString()
  @MaxLength(50)
  category: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  subcategory?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  color?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  secondaryColors?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(50)
  pattern?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  material?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  fit?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  styleTags?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(50)
  formality?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  season?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  brand?: string;

  @IsOptional()
  @IsDateString()
  purchaseDate?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsBoolean()
  favorite?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string;

  @IsOptional()
  @IsIn(['DRAFT', 'SAVED'])
  status?: 'DRAFT' | 'SAVED';

  @IsOptional()
  @IsString()
  @MaxLength(30)
  source?: string;
}
