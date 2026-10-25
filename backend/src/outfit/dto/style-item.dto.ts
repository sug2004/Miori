import { IsOptional, IsString } from 'class-validator';

export class StyleItemDto {
  @IsString()
  wardrobeItemId: string;

  @IsOptional()
  @IsString({ each: true })
  looks?: string[];
}
