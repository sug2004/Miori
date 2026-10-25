import { IsArray, IsOptional, IsString } from 'class-validator';

export class GenerateOutfitDto {
  @IsString()
  occasion: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  useItemIds?: string[];
}
