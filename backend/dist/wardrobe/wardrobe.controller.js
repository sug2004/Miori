var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CreateWardrobeItemDto } from './dto/create-wardrobe-item.dto.js';
import { UpdateWardrobeItemDto } from './dto/update-wardrobe-item.dto.js';
import { WardrobeService } from './wardrobe.service.js';
function parseBoolean(value) {
    if (value === 'true')
        return true;
    if (value === 'false')
        return false;
    return undefined;
}
function parseStatus(value) {
    return value === 'DRAFT' || value === 'SAVED' ? value : undefined;
}
let WardrobeController = class WardrobeController {
    wardrobeService;
    constructor(wardrobeService) {
        this.wardrobeService = wardrobeService;
    }
    list(user, category, favorite, status, search, sort) {
        return this.wardrobeService.list(user.id, {
            category: category?.trim() || undefined,
            favorite: parseBoolean(favorite),
            status: parseStatus(status),
            search,
            sort,
        });
    }
    async upload(user, file) {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }
        return this.wardrobeService.createDraft(user.id, file);
    }
    create(user, dto) {
        return this.wardrobeService.create(user.id, dto);
    }
    get(user, id) {
        return this.wardrobeService.get(user.id, id);
    }
    update(user, id, dto) {
        return this.wardrobeService.update(user.id, id, dto);
    }
    remove(user, id) {
        return this.wardrobeService.remove(user.id, id);
    }
    markWorn(user, id) {
        return this.wardrobeService.markWorn(user.id, id);
    }
};
__decorate([
    Get(),
    __param(0, CurrentUser()),
    __param(1, Query('category')),
    __param(2, Query('favorite')),
    __param(3, Query('status')),
    __param(4, Query('search')),
    __param(5, Query('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], WardrobeController.prototype, "list", null);
__decorate([
    Post('upload'),
    UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024 } })),
    __param(0, CurrentUser()),
    __param(1, UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WardrobeController.prototype, "upload", null);
__decorate([
    Post(),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateWardrobeItemDto]),
    __metadata("design:returntype", void 0)
], WardrobeController.prototype, "create", null);
__decorate([
    Get(':id'),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WardrobeController.prototype, "get", null);
__decorate([
    Patch(':id'),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateWardrobeItemDto]),
    __metadata("design:returntype", void 0)
], WardrobeController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WardrobeController.prototype, "remove", null);
__decorate([
    Post(':id/wear'),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WardrobeController.prototype, "markWorn", null);
WardrobeController = __decorate([
    Controller('wardrobe'),
    UseGuards(JwtAuthGuard),
    __metadata("design:paramtypes", [WardrobeService])
], WardrobeController);
export { WardrobeController };
//# sourceMappingURL=wardrobe.controller.js.map