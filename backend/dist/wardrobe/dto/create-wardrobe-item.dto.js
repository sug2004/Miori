var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDateString, IsIn, IsNumber, IsOptional, IsString, MaxLength, Min, } from 'class-validator';
export class CreateWardrobeItemDto {
    imageUrl;
    category;
    subcategory;
    color;
    secondaryColors;
    pattern;
    material;
    fit;
    styleTags;
    formality;
    season;
    brand;
    purchaseDate;
    price;
    favorite;
    notes;
    status;
    source;
}
__decorate([
    IsString(),
    MaxLength(2000),
    __metadata("design:type", String)
], CreateWardrobeItemDto.prototype, "imageUrl", void 0);
__decorate([
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], CreateWardrobeItemDto.prototype, "category", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], CreateWardrobeItemDto.prototype, "subcategory", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], CreateWardrobeItemDto.prototype, "color", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreateWardrobeItemDto.prototype, "secondaryColors", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], CreateWardrobeItemDto.prototype, "pattern", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], CreateWardrobeItemDto.prototype, "material", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], CreateWardrobeItemDto.prototype, "fit", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreateWardrobeItemDto.prototype, "styleTags", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], CreateWardrobeItemDto.prototype, "formality", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], CreateWardrobeItemDto.prototype, "season", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateWardrobeItemDto.prototype, "brand", void 0);
__decorate([
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], CreateWardrobeItemDto.prototype, "purchaseDate", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    Min(0),
    Type(() => Number),
    __metadata("design:type", Number)
], CreateWardrobeItemDto.prototype, "price", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateWardrobeItemDto.prototype, "favorite", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(2000),
    __metadata("design:type", String)
], CreateWardrobeItemDto.prototype, "notes", void 0);
__decorate([
    IsOptional(),
    IsIn(['DRAFT', 'SAVED']),
    __metadata("design:type", String)
], CreateWardrobeItemDto.prototype, "status", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(30),
    __metadata("design:type", String)
], CreateWardrobeItemDto.prototype, "source", void 0);
//# sourceMappingURL=create-wardrobe-item.dto.js.map