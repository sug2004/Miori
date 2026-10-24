import { IsInt, IsOptional, Min } from 'class-validator';

export class StylePreferencesDto {
  @IsOptional()
  styleGoals?: unknown;

  @IsOptional()
  styleTags?: unknown;

  @IsOptional()
  colorPalette?: unknown;

  @IsOptional()
  preferredCategories?: unknown;

  @IsOptional()
  @IsInt()
  @Min(0)
  budgetMin?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  budgetMax?: number;
}